define(["require"], function (_require) {
  var modP = new Promise((_resolve, _reject) => _require(["mod"], imported => _resolve(imported), _reject));
});
