/* @minVersion 7.0.0-beta.0 */

import setPrototypeOf from "./setPrototypeOf.ts";

export default function _inheritsLoose(
  subClass: Function,
  superClass: Function,
) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}
