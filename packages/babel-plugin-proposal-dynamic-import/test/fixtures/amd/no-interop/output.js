define(["require"], function (_require) {
  var modP = new Promise(_resolve => _require(["mod"], imported => _resolve(imported)));
});
