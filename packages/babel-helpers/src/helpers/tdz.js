/* @minVersion 7.5.5 */

export default function _tdzError(name) {
  throw new ReferenceError(name + " is not defined - temporal dead zone");
}
