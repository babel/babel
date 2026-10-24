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
  for (var _ref of [_C]) {
    var _ref2 = _ref;
    x = babelHelpers.assertClassBrand(_C, _ref2, _x)._;
    ({
      [a]: a
    } = _ref2);
    {
      const a = "A";
    }
  }
})();
