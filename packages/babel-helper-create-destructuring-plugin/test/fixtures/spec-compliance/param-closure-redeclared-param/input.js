function f({ a = () => x, ...rest }, x) {
  var x = 2;
  return [a(), x, rest];
}
