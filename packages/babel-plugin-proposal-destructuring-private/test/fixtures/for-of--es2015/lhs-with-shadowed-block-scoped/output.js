class C {}
babelHelpers.defineProperty(C, "a", "a");
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var x,
    a = "a";
  for (const _ref of [C]) {
    x = babelHelpers.classStaticPrivateFieldSpecGet(_ref, C, _x), ({
      [a]: a
    } = _ref);
    {
      const a = "A";
    }
  }
})();
