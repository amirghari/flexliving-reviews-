export function toISO(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
}
export function slugifyId(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}