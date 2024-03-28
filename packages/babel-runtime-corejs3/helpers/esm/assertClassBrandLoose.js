export default function _assertClassBrandLoose(e, t, r) {
  if (!{}.hasOwnProperty.call(e, t)) throw TypeError("attempted to use private field on non-instance");
  return r ? e[t] : e;
}