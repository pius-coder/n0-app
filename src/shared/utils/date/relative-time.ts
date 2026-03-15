export function relativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "an"],
    [2592000, "mois"],
    [86400, "jour"],
    [3600, "heure"],
    [60, "minute"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) {
      return `il y a ${count} ${label}${count > 1 && label !== "mois" ? "s" : ""}`;
    }
  }

  return "à l'instant";
}
