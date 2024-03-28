export default function _classPrivateFieldBase2(receiver, privateKey, retThis) {
  if (!{}.hasOwnProperty.call(receiver, privateKey)) {
    throw TypeError("attempted to use private field on non-instance");
  }
  return retThis ? receiver : receiver[privateKey];
}