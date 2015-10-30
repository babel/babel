var _loop = function (i) {
  fns.push(function () {
    return i;
  });
  return "continue";
};

for (var i in nums) {
  var _ret = _loop(i);

  if (_ret === "continue") continue;
}
