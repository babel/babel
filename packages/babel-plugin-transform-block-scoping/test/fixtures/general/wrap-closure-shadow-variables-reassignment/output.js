var _loop = function (_index) {
  if (_index % 2) {
    _index += 3;
    index = _index;
    return "continue";
  }

  var fn = function () {
    _index;
  };

  index = _index;
};

for (var index = 0; index < 10; index++) {
  var _ret = _loop(index);

  if (_ret === "continue") continue;
}
