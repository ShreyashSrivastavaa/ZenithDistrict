export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Active';
  return dateStr;
}

export function truncate(text: string, maxLen: number = 100): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + '…';
}
