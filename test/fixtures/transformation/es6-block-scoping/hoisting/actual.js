for (let i of nums) {
  var x = 5;
  fns.push(function () {
    return i * x;
  });
}
