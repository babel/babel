var _class;
class C {}
_class = C;
babelHelpers.defineProperty(C, "a", "a");
var _x = {
  writable: true,
  value: void 0
};
(() => {
  const a = "a";
  for (const _ref of [_class]) {
    const x = babelHelpers.classStaticPrivateFieldSpecGet(_ref, _class, _x),
      {
        [a]: _
      } = _ref;
    {
      const a = "A";
    }
  }
})();
