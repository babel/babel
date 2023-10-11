var _class;
class C {}
_class = C;
babelHelpers.defineProperty(C, "a", "a");
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var x,
    a = "a";
  for (const _ref of [_class]) {
    x = babelHelpers.classStaticPrivateFieldSpecGet(_ref, _class, _x), ({
      [a]: a
    } = _ref);
    {
      const a = "A";
    }
  }
})();
