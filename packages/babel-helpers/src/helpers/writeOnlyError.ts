/* @minVersion 7.12.13 */

export default function _writeOnlyError(name) {
  throw new TypeError('"' + name + '" is write-only');
}
