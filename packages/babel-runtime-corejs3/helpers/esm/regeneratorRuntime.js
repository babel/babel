import _Object$getPrototypeOf from "core-js-pure/features/object/get-prototype-of.js";
import _reverseInstanceProperty from "core-js-pure/features/instance/reverse.js";
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
  function n(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    return function (e) {
      if (!e.stop) {
        var t = e.delegateYield,
          n = e.abrupt;
        e.stop = function () {
          return n(2);
        }, e["catch"] = function () {
          return e.sent;
        }, e.abrupt = function (r, e) {
          return n(o[r], e);
        }, e.delegateYield = function (r, n, o) {
          return e.resultName = n, t(r, o);
        };
      }
      return e.resultName && (e[e.resultName] = e.sent, e.resultName = void 0), r.call(this, e);
    };
  }
  return (_regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, t, n, o) {
        return r.w(a(e), t, n, o && _reverseInstanceProperty(o).call(o));
      },
      isGeneratorFunction: n,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, o, u) {
        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  })();
}
export { _regeneratorRuntime as default };