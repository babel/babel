/* @minVersion 7.12.13 */

export default function _writeOnlyError(name: string) {
  throw new TypeError('"' + name + '" is write-only');
}
