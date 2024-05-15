export default function _writeOnlyError(r) {
  throw new TypeError('"' + r + '" is write-only');
}