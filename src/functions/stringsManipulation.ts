export function getInitials(input: string): string {
  const trimmed = input.trim();
  const words = trimmed.split(/\s+/);

  if (words.length === 1) {
    return words[0].substring(0, 3);
  }

  if (words.length === 2) {
    return words[0].substring(0, 2) + words[1].charAt(0);
  }

  return words[0].charAt(0) + words[1].charAt(0) + words[2].charAt(0);
}
