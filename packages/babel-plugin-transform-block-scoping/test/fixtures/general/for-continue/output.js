var _loop = function (i) {
  fns.push(function () {
    return i;
  });
  // continue
  return 1;
};
for (var i in nums) {
  if (_loop(i)) continue;
}
