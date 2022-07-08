function f(...{ length: x = 0, y = x }) {
  var x;
  return x;
}

function g(...{ length: x = 0, y = x }) {
  var x = 1;
  return x;
}
