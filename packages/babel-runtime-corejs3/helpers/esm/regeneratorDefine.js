import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
function regeneratorDefine(e, r, n, t) {
  regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    return _Object$defineProperty(e, r, {
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
      return e[r] = n;
    };
  }
  return regeneratorDefine(e, r, n, t);
}
export { regeneratorDefine as default };