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
    n = (_Object$getPrototypeOf ? _Object$getPrototypeOf(e) : e.__proto__).constructor;
  function t(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === n || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    var e, n;
    return function (t) {
      e || (e = {
        stop: function stop() {
          return n(t.a, 2);
        },
        "catch": function _catch() {
          return t.v;
        },
        abrupt: function abrupt(r, e) {
          return n(t.a, o[r], e);
        },
        delegateYield: function delegateYield(r, o, a) {
          return e.resultName = o, n(t.d, r, a);
        },
        finish: function finish(r) {
          return n(t.f, r);
        }
      }, n = function n(r, _n, o) {
        t.p = e.prev, t.n = "end" === e.next ? -1 : e.next;
        try {
          return r(_n, o);
        } finally {
          e.next = -1 === t.n ? "end" : t.n;
        }
      }), e.resultName && (e[e.resultName] = t.v, e.resultName = void 0), e.sent = t.v, e.next = -1 === t.n ? "end" : t.n;
      try {
        return r.call(this, e);
      } finally {
        t.p = e.prev, t.n = "end" === e.next ? -1 : e.next;
      }
    };
  }
  return (_regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, n, t, o) {
        return r.w(a(e), n, t, o && _reverseInstanceProperty(o).call(o));
      },
      isGeneratorFunction: t,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, n, o, u) {
        return (t(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, n, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  })();
}
export { _regeneratorRuntime as default };