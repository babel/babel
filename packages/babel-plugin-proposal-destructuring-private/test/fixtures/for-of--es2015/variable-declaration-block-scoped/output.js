var _C;
class C {}
_C = C;
babelHelpers.defineProperty(C, "a", "a");
var _x = {
  writable: true,
  value: void 0
};
(() => {
  const a = "a";
  for (const _ref of [_C]) {
    const x = babelHelpers.classStaticPrivateFieldSpecGet(_ref, _C, _x),
      {
        [a]: _
      } = _ref;
    {
      const a = "A";
    }
  }
})();
