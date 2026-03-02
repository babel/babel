export default function isCompatTag(tagName?: string | null): boolean {
  // Must start with a lowercase ASCII letter
  return !!tagName && /^[a-z]/.test(tagName);
}
