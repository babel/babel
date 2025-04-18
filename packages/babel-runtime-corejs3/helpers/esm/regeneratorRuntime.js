import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import OverloadYield from "./OverloadYield.js";
import regenerator from "./regenerator.js";
import regeneratorAsync from "./regeneratorAsync.js";
import regeneratorAsyncGen from "./regeneratorAsyncGen.js";
import regeneratorAsyncIterator from "./regeneratorAsyncIterator.js";
import regeneratorKeys from "./regeneratorKeys.js";
import regeneratorValues from "./regeneratorValues.js";
function _regeneratorRuntime() {
  "use strict";

  var r = regenerator(),
    e = r.m(_regeneratorRuntime),
    t = (_Object$getPrototypeOf ? _Object$getPrototypeOf(e) : e.__proto__).constructor;
  function o(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  return (_regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: r.w,
      isGeneratorFunction: o,
      mark: r.m,
      awrap: OverloadYield,
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, n, a) {
        return (o(e) ? regeneratorAsyncGen : regeneratorAsync)(r, e, t, n, a);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  })();
}
export { _regeneratorRuntime as default };