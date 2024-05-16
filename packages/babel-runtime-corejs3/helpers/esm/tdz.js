export default function _tdzError(e) {
  throw new ReferenceError(e + " is not defined - temporal dead zone");
}