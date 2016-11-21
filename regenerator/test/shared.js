var assert = require("assert");

exports.check = function check(g, yields, returnValue) {
  for (var i = 0; i < yields.length; ++i) {
    var info = g.next(i);
    assert.deepEqual(info.value, yields[i]);
    assert.strictEqual(info.done, false);
  }

  assert.deepEqual(
    i > 0 ? g.next(i) : g.next(),
    { value: returnValue, done: true }
  );
};
