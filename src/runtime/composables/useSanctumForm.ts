import { serialize as objectToFormData } from 'object-to-formdata';
import type { FetchOptions, MappedResponseType, ResponseType } from 'ofetch';
import { cloneDeep, isEqual, get, set } from 'lodash-es';
import { reactive, toRaw, watch } from 'vue';
import type { Form, NamedInputEvent, RequestMethod } from '../types';
import { hasFile } from '../helpers/has-file';
import { useSanctumFetch } from './useSanctumFetch';

/**
 * Utility function to resolve an input's name attribute.
 */
const resolveName = (name: string | NamedInputEvent): string =>
  typeof name !== 'string' ? name.target.name : name;

/**
 * Converts complex validation errors into simple validation messages.
 */
const toSimpleValidationErrors = <Data extends Record<string, unknown>>(
  errors: Partial<Record<keyof Data, string | string[]>>,
): Partial<Record<keyof Data, string>> =>
  (Object.keys(errors) as (keyof Data)[]).reduce(
    (carry, key) => {
      carry[key] = Array.isArray(errors[key])
        ? errors[key]![0]
        : (errors[key] as string);
      return carry;
    },
    {} as Partial<Record<keyof Data, string>>,
  );

/**
 * Resolves the URL or function returning the URL.
 */
const resolveUrl = (url: string | (() => string)): string =>
  typeof url === 'string' ? url : url();

/**
 * Resolves the request method (GET, POST, etc.) or function returning the method.
 */
const resolveMethod = (
  method: RequestMethod | (() => RequestMethod),
): RequestMethod =>
  typeof method === 'string'
    ? (method.toLowerCase() as RequestMethod)
    : method();

/**
 * Resolves the options used in the fetch request, including hooks for request/response lifecycle.
 */
const resolveSubmitOptions = (
  form: Form<any>,
  options: FetchOptions,
): FetchOptions => ({
  ...options,
  async onRequest(context) {
    form.processing = true;
    form.setErrors({});
    options.onRequest?.(context);
  },
  async onResponse(context) {
    form.processing = false;
    options.onResponse?.(context);
  },
  async onResponseError(context) {
    if (context.response.status === 422) {
      form.setErrors(context.response._data.errors);
    }
    options.onResponseError?.(context);
  },
});

/**
 * Creates a form instance that supports reactive input handling, validation, and file uploads.
 */
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
  const originalInputs = Object.keys(originalData) as (keyof Data)[];

  /**
   * The form object containing data, validation, submission, and utility methods.
   */
  let form: Data & Form<Data> = {
    ...cloneDeep(originalData),
    data() {
      const rawData = cloneDeep(toRaw(form));
      return originalInputs.reduce<Partial<Data>>(
        (carry, name) => ({
          ...carry,
          [name]: rawData[name],
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
    async submit<T = any, R extends ResponseType = 'json'>(
      options: FetchOptions<R> = {},
    ): Promise<MappedResponseType<R, T>> {
      let methodType = resolveMethod(method);
      let preparedData: Data | FormData = form.data();

      // Convert to FormData if files are detected
      if (hasFile(preparedData)) {
        preparedData = objectToFormData(preparedData, {
          indices: true,
          booleansAsIntegers: true,
        });

        // Method spoofing for file uploads with non-POST methods
        if (methodType !== 'post') {
          preparedData.append('_method', methodType);
          methodType = 'post';
        }
      }

      return useSanctumFetch(resolveUrl(url), {
        method: methodType,
        body: preparedData,
        ...resolveSubmitOptions(form, options),
      });
    },
    errors: {},
    hasErrors: false,
    setErrors(value) {
      const preparedErrors = toSimpleValidationErrors(value);
      if (!isEqual(form.errors, preparedErrors)) {
        form.errors = preparedErrors;
      }
      return form;
    },
    forgetError(name) {
      const newErrors = { ...form.errors };
      Reflect.deleteProperty(newErrors, resolveName(name as string));
      form.setErrors(newErrors);
      return form;
    },
    invalid(name) {
      return Boolean(form.errors[name]);
    },
    reset(...names) {
      const original = cloneDeep(originalData);

      if (names.length === 0) {
        originalInputs.forEach((name) => {
          (form[name] as Data[keyof Data]) = original[name];
        });
      } else {
        names.forEach((name) => set(form, name, get(original, name)));
      }

      return form;
    },
  };

  // Make the form reactive and watch for errors
  form = reactive(form) as Data & Form<Data>;
  watch(
    () => form.errors,
    () => {
      form.hasErrors = Object.keys(form.errors).length > 0;
    },
  );

  return form;
};
