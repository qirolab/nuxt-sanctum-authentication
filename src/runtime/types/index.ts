export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequestMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';
