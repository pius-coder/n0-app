export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce(
    (acc, item) => {
      const k = String(item[key]);
      (acc[k] ??= []).push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
