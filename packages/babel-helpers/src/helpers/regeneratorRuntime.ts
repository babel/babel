/* @minVersion 7.18.0 */
/* @mangleFns */

import regenerator from "./regenerator.ts";
import values from "./regeneratorValues.ts";

export default function /* @no-mangle */ _regeneratorRuntime() {
  "use strict";

  var r = regenerator();

  // @ts-expect-error explicit function assignment
  return (_regeneratorRuntime = function () {
    return {
      wrap: r.w,
      mark: r.m,
      values: values,
      isGeneratorFunction: function (genFun: any) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor
          ? ctor === r.G ||
              // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === "GeneratorFunction"
          : false;
      },
    };
  })();
}
