for (let i of [1, 2, 3]) {
  var x = 5;
  fns.push(function () {
    return i * x;
  });
}
