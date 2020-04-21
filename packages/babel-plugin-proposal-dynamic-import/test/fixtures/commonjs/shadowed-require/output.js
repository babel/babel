var _require2 = "foo";

(async function () {
  var _require = "bar";
  await Promise.resolve("./mod").then(s => babelHelpers.interopRequireWildcard(require(s)));
})();
