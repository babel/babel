function* g(...[a]) {
  var a = 1;
  yield [a, this];
}
async function f(...[b]) {
  var b = 2;
  return [b, arguments.length];
}
async function* h(...[c]) {
  var c = 3;
  yield c;
}
async function k(...[{ d }]) {
  var d = 4;
  return d;
}
