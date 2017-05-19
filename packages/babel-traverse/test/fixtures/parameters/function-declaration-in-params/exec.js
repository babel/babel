if (parseInt(process.version.slice(1)) < 6) process.exit();

const val = (function f(a, b = (() => a)) {
  var a;
  assert.equal(a, 1);
  a = "this value is inaccisible to b";
  return b();
})(1);

assert.equal(val, 1);
