export default function _readOnlyError(r) {
  throw new TypeError('"' + r + '" is read-only');
}