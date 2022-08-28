export function extract(l, key) {
    const result = new Set();
    for (const element of l) {
      if (Array.isArray(element[key])) {
        for (const i of element[key]) {
          result.add(i);
        }
        continue;
      }
  
      result.add(element[key]);
    }
    // result.sort();
    return [...result].sort();
  }
  