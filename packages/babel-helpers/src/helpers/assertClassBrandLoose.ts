/* @minVersion 7.24.1 */

export default function _classPrivateFieldGetLoose(
  receiver: any,
  privateKey: string | symbol,
  returnProperty: boolean,
) {
  if (!{}.hasOwnProperty.call(receiver, privateKey)) {
    throw TypeError("attempted to use private field on non-instance");
  }
  return returnProperty ? receiver[privateKey] : receiver;
}
