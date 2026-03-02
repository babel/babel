var _loop = function (i) {
  fns.push(function () {
    return i;
  });
  return 1; // break
};
for (var i in nums) {
  if (_loop(i)) break;
}
