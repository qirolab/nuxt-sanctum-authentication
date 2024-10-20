import { serialize as objectToFormData } from 'object-to-formdata';
import type { FetchOptions, MappedResponseType, ResponseType } from 'ofetch';
import { cloneDeep, isEqual } from 'lodash-es';
import { reactive, toRaw, watch } from 'vue';
import type { Form, NamedInputEvent, RequestMethod } from '../types';
import { hasFile } from '../helpers/has-file';
import { useSanctumFetch } from '#imports';

export const useSanctumForm = <Data extends Record<string, unknown>>(
  method: RequestMethod | (() => RequestMethod),
  url: string | (() => string),
  inputs: Data,
): Data & Form<Data> => {
  /**
   * The original data.
   */
  const originalData = cloneDeep(inputs);

  /**
   * The original input names.
   */
  const originalInputs: (keyof Data)[] = Object.keys(originalData);

  /**
   * Resolve the input's "name" attribute.
   */
  const resolveName = (name: string | NamedInputEvent): string => {
    return typeof name !== 'string' ? name.target.name : name;
  };

  function toValidationErrors<Data extends Record<string, unknown>>(
    errors: Partial<Record<keyof Data, string | string[]>>,
  ): Partial<Record<keyof Data, string>> {
    return Object.keys(errors).reduce(
      (carry, key) => ({
        ...carry,
        [key]: typeof errors[key] === 'string' ? [errors[key]] : errors[key],
      }),
      {},
    );
  }

  const resolveUrl = (url: string | (() => string)): string =>
    typeof url === 'string' ? url : url();

  const resolveMethod = (
    method: RequestMethod | (() => RequestMethod),
  ): RequestMethod =>
    typeof method === 'string'
      ? (method.toLowerCase() as RequestMethod)
      : method();

  const resolveSubmitOptions = (options: FetchOptions): FetchOptions => {
    return {
      ...options,
      async onRequest(context) {
        form.processing = true;
        form.setErrors({});
        if (options.onRequest) {
          options.onRequest(context);
        }
      },
      async onResponse(context) {
        form.processing = false;
        if (options.onResponse) {
          options.onResponse(context);
        }
      },
      async onResponseError(context) {
        if (context.response.status === 422) {
          form.setErrors(context.response._data.errors);
        }

        if (options.onResponseError) {
          options.onResponseError(context);
        }
      },
    };
  };

  /**
   * Create a new form instance.
   */
  let form: Data & Form<Data> = {
    ...cloneDeep(originalData),
    data() {
      const data = cloneDeep(toRaw(form));
      return originalInputs.reduce<Partial<Data>>(
        (carry, name) => ({
          ...carry,
          [name]: data[name],
        }),
        {},
      ) as Data;
    },
    setData(data: Record<string, unknown>) {
      Object.keys(data).forEach((input) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        form[input] = data[input];
      });
      return form;
    },
    processing: false,
    submit: async <T = any, R extends ResponseType = 'json'>(
      options: FetchOptions<R> = {},
    ): Promise<MappedResponseType<R, T>> => {
      let methodType = resolveMethod(method);
      let preparedData: Data | FormData = form.data();

      if (hasFile(preparedData)) {
        preparedData = objectToFormData(preparedData, {
          indices: true,
          booleansAsIntegers: true,
        });

        // Form Method Spoofing is needed to send files using PUT/PATCH/DELETE.
        // https://laravel.com/docs/routing#form-method-spoofing
        // https://github.com/laravel/framework/issues/13457
        if (methodType !== 'post') {
          preparedData.append('_method', methodType);
          methodType = 'post';
        }
      }

      return useSanctumFetch(resolveUrl(url), {
        method: methodType,
        body: preparedData,
        ...resolveSubmitOptions(options),
      });
    },
    errors: {},
    hasErrors: false,
    setErrors(value) {
      const prepared = toValidationErrors(value);
      if (!isEqual(form.errors, prepared)) {
        form.errors = prepared;
      }
      return form;
    },
    forgetError(name: keyof Data | NamedInputEvent) {
      const newErrors = { ...form.errors };
      Reflect.deleteProperty(newErrors, resolveName(name as string));
      form.setErrors(newErrors);

      return form;
    },

    invalid(name) {
      return typeof form.errors[name] !== 'undefined';
    },
  };

  form = reactive(form) as Data & Form<Data>;

  watch(
    () => form.errors,
    () => {
      form.hasErrors = Object.keys(form.errors).length > 0;
    },
  );
  return form;
};
