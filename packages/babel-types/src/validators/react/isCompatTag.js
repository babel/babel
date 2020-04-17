// @flow
export default function isCompatTag(tagName?: string): boolean {
  // Must start with a lowercase ASCII letter
  return !!tagName && /^[a-z]/.test(tagName);
}
