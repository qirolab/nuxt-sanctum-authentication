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
  data(): Data;
  setData(data: Record<string, unknown>): Data & Form<Data>;
  processing: boolean;
  submit<T = any, R extends ResponseType = 'json'>(
    options?: FetchOptions<R>,
  ): Promise<MappedResponseType<R, T>>;
  errors: Partial<Record<keyof Data, string[]>>;
  hasErrors: boolean;
  setErrors(
    errors: Partial<Record<keyof Data, string | string[]>>,
  ): Data & Form<Data>;
  invalid(name: keyof Data): boolean;
  forgetError(string: keyof Data | NamedInputEvent): Data & Form<Data>;
  reset(...keys: (keyof Partial<Data>)[]): Data & Form<Data>;
}
