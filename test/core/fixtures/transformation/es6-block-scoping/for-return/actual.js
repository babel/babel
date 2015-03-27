(function () {
  for (let i in nums) {
    fns.push(function () { return i; });
    return i;
  }
})();
