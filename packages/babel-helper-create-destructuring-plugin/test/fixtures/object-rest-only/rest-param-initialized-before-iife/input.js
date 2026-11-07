function f({ a, ...b }, c = g(), ...args) {
  var args = args.concat(1);
  return args;
}
function h({ ...i }, j = id(() => k), ...k) {
  var k = [];
  return j();
}
function* gen({ ...l }, n = g(), ...m) {
  yield [n, m];
}
function k({ ...d } = {}, ...[x]) {
  var x = 5;
  return x;
}
function m({ ...d } = {}, ...[y, z = () => y]) {
  var y = 6;
  return [y, z()];
}
