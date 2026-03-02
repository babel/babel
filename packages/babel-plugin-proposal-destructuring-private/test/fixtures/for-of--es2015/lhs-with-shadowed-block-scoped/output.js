var _C;
class C {}
_C = C;
babelHelpers.defineProperty(C, "a", "a");
var _x = {
  _: void 0
};
(() => {
  var x,
    a = "a";
  for (const _ref of [_C]) {
    x = babelHelpers.assertClassBrand(_C, _ref, _x)._, {
      [a]: a
    } = _ref;
    {
      const a = "A";
    }
  }
})();
