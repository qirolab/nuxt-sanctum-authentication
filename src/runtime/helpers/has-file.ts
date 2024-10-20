const hasFile = (data: { [key: string]: unknown }): boolean => {
  for (const property in data) {
    if (hasFileDeep(data[property])) {
      return true;
    }
  }

  return false;
};

const isFile = (item: any): boolean => {
  return item instanceof Blob || item instanceof FileList;
};

const hasFileDeep = (item: any): boolean => {
  if (isFile(item)) {
    return true;
  }

  if (typeof item === 'object') {
    for (const key in item) {
      if (hasFileDeep(item[key])) {
        return true;
      }
    }
  }

  if (Array.isArray(item)) {
    // return item.some((element) => hasFileDeep(element));
    return item.some(hasFileDeep);
  }

  return false;
};

export { hasFile, isFile, hasFileDeep };
