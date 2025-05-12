import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function regeneratorDefine(e, r, n, t) {
  regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    _Object$defineProperty(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    });
  };
  try {
    regeneratorDefine({}, "");
  } catch (e) {
    regeneratorDefine = function regeneratorDefine(e, r, n) {
      e[r] = n;
    };
  }
  regeneratorDefine(e, r, n, t);
}
export { regeneratorDefine as default };