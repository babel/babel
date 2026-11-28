/* @minVersion 8.2.0 */

// Called after the static elements of a struct have been evaluated.
export default function _sealStruct(struct: Function) {
  Object.seal(struct.prototype);
}
