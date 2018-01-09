var _loop = function (i) {
  fns.push(function () {
    return i;
  });
  return "break";
};

for (var i in nums) {
  var _ret = _loop(i);

  if (_ret === "break") break;
}
