define(["require"], function (_require) {
  var modP = Promise.resolve().then(() => new Promise((_resolve, _reject) => _require(["mod"], imported => _resolve(imported), _reject)));
});
