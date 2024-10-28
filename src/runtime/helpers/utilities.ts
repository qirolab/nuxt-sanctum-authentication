export function extractNestedValue<T>(
  response: any,
  wrapperKey: string | null,
): T | null {
  if (!wrapperKey) return response as T;

  return wrapperKey
    .split('.')
    .reduce((acc, key) => acc && acc[key], response) as T;
}
