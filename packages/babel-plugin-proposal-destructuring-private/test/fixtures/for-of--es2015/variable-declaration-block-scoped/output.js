var _C;
class C {}
_C = C;
babelHelpers.defineProperty(C, "a", "a");
var _x = {
  _: void 0
};
(() => {
  const a = "a";
  for (const _ref of [_C]) {
    const x = babelHelpers.assertClassBrand(_C, _ref, _x)._,
      {
        [a]: _
      } = _ref;
    {
      const a = "A";
    }
  }
})();
