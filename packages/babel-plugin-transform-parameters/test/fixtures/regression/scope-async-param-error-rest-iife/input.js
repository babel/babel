async function f({ x }, ...rest) {
  function rest() {}
  return [x, typeof rest];
}

async function g({ x } = y, ...rest) {
  function rest() {}
  var y;
  return [x, typeof rest];
}
