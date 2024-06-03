/* @minVersion 7.0.0-beta.0 */

export default function _classPrivateFieldBase<T extends object>(
  receiver: T,
  privateKey: PropertyKey,
) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
