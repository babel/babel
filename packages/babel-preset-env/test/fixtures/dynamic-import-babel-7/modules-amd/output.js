define(["require"], function (_require) {
  Promise.resolve().then(function () {
    return new Promise(function (_resolve, _reject) {
      return _require(["foo"], function (imported) {
        return _resolve(babelHelpers.interopRequireWildcard(imported));
      }, _reject);
    });
  });
});
