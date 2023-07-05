var _loop = function (i) {
  fns.push(function () {
    return i;
  });
  return 1; // continue
};
for (var i in nums) {
  if (_loop(i)) continue;
}
