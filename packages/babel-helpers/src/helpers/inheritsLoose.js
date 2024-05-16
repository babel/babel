/* @minVersion 7.0.0-beta.0 */

import setPrototypeOf from "setPrototypeOf";

export default function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}
