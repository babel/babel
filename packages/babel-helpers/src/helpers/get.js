/* @minVersion 7.0.0-beta.0 */

import superPropBase from "superPropBase";

// https://tc39.es/ecma262/multipage/reflection.html#sec-reflect.get
//
//  28.1.5 Reflect.get ( target, propertyKey [ , receiver ] )
export default function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    // need a bind because https://github.com/babel/babel/issues/14527
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);

      if (!base) return;

      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        // STEP 3. If receiver is not present, then set receiver to target.
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
