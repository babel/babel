import regeneratorDefine from "./regeneratorDefine.js";
function defineIteratorMethods(e) {
  function n(n, t) {
    regeneratorDefine(e, n, function (e) {
      return this._invoke(n, t, e);
    });
  }
  n("next", 0), n("throw", 1), n("return", 2);
}
export { defineIteratorMethods as default };