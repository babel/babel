new class {
  foo(_x, _x2) {
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    }) {})();
  }
}().foo().catch(e => {
  console.log("caught");
});
