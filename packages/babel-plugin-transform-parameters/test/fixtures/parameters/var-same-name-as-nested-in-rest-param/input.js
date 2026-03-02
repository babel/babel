function f(...[x, y = x]) {
  var x;
  return x;
}

function g(...[x, y = x]) {
  var x = 1;
  return x;
}
