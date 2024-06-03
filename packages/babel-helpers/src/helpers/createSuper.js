/* @minVersion 7.9.0 */

import getPrototypeOf from "getPrototypeOf";
import isNativeReflectConstruct from "isNativeReflectConstruct";
import possibleConstructorReturn from "possibleConstructorReturn";

export default function _createSuper(Derived) {
  var hasNativeReflectConstruct = isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      // NOTE: This doesn't work if this.__proto__.constructor has been modified.
      var NewTarget = getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return possibleConstructorReturn(this, result);
  };
}
