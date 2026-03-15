export function unique<T>(arr: T[], key?: keyof T): T[] {
  if (!key) return [...new Set(arr)];
  const seen = new Set<unknown>();
  return arr.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}
