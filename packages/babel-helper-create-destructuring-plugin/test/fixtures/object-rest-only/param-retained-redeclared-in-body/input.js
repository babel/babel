function f({ ...rest }, read = () => value, value, last = value) {
  var value;
  value = 2;
  return [read(), last];
}

function g({ ...rest }, read = () => value, value, last = 5) {
  var value;
  value = 2;
  return [read(), last];
}
