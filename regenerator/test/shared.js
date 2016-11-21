var assert = require("assert");

exports.iteratorSymbol = typeof Symbol === "function"
  && Symbol.iterator
  || "@@iterator";

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
