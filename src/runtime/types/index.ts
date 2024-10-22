import type { FetchOptions, MappedResponseType, ResponseType } from 'ofetch';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

interface NamedEventTarget extends EventTarget {
  name: string;
}

export interface NamedInputEvent extends InputEvent {
  readonly target: NamedEventTarget;
}

export interface Form<Data extends Record<string, unknown>> {
  /**
   * Retrieve the current form data.
   */
  data(): Data;

  /**
   * Set the form data with the provided values.
   */
  setData(data: Partial<Data>): Data & Form<Data>;

  /**
   * Indicates whether the form is processing a submission.
   */
  processing: boolean;

  /**
   * Submit the form data using the specified fetch options.
   */
  submit<T = any, R extends ResponseType = 'json'>(
    options?: FetchOptions<R>,
  ): Promise<MappedResponseType<R, T>>;

  /**
   * A map of validation errors for form fields.
   */
  errors: Partial<Record<keyof Data, string>>;

  /**
   * Indicates whether the form has any errors.
   */
  hasErrors: boolean;

  /**
   * Set validation errors for form fields.
   */
  setErrors(
    errors: Partial<Record<keyof Data, string | string[]>>,
  ): Data & Form<Data>;

  /**
   * Check if a form field is invalid based on the errors.
   */
  invalid(name: keyof Data): boolean;

  /**
   * Clear the error message for a specific field.
   */
  forgetError(name: keyof Data | NamedInputEvent): Data & Form<Data>;

  /**
   * Reset the form fields to their original values.
   */
  reset(...keys: (keyof Data)[]): Data & Form<Data>;
}
