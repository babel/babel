class C {}
babelHelpers.defineProperty(C, "a", "a");
var _x = {
  writable: true,
  value: void 0
};
(() => {
  const a = "a";
  for (const _ref of [C]) {
    const x = babelHelpers.classStaticPrivateFieldSpecGet(_ref, C, _x),
      {
        [a]: _
      } = _ref;
    {
      const a = "A";
    }
  }
})();
