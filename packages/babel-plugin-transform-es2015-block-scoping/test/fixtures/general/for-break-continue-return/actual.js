(function () {
  for (let i in nums) {
    fns.push(function () { return i; });
    if (i === 1) {
      continue;
    } else if (i === 2) {
      break;
    } else if (i === 3) {
      return i;
    }
  }
})();
