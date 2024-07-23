/* @minVersion 7.23.8 */

// This is duplicated to packages/babel-plugin-transform-classes/src/inline-callSuper-helpers.ts

import getPrototypeOf from "./getPrototypeOf.ts";
import isNativeReflectConstruct from "./isNativeReflectConstruct.ts";
import possibleConstructorReturn from "./possibleConstructorReturn.ts";

export default function _callSuper(
  _this: object,
  derived: Function,
  args: ArrayLike<any>,
) {
  // Super
  derived = getPrototypeOf(derived);
  return possibleConstructorReturn(
    _this,
    isNativeReflectConstruct()
      ? // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        Reflect.construct(
          derived,
          args || [],
          getPrototypeOf(_this).constructor,
        )
      : derived.apply(_this, args),
  );
}
