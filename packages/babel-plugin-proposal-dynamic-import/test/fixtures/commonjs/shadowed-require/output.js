var _require2 = "foo";

(async function () {
  var _require = "bar";
  await new Promise(_resolve => _resolve(babelHelpers.interopRequireWildcard(require("./mod"))));
})();
