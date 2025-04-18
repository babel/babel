import regeneratorDefine from "./regeneratorDefine.js";
function defineIteratorMethods(e) {
  function n(n) {
    regeneratorDefine(e, n, function (e) {
      return this._invoke(n, e);
    });
  }
  n("next"), n("throw"), n("return");
}
export { defineIteratorMethods as default };