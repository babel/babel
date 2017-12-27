// @flow
export default function isCompatTag(tagName?: string): boolean {
  return !!tagName && /^[a-z]|-/.test(tagName);
}
