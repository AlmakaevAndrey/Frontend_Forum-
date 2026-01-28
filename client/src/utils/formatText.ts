export function formatText(text: string): string {
  if (!text) return '';

  return text
    .split(/\n+/)
    .map((line) => `<p>${line.trim()}</p>`)
    .join('');
}
