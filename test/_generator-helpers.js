var assert = require("assert");

exports.check = function check(g, yields, returnValue) {
  for (var i = 0; i < yields.length; ++i) {
    var info = i > 0 ? g.next(i) : g.next();
    assert.deepEqual(info.value, yields[i]);
    assert.strictEqual(info.done, false);
  }

  assert.deepEqual(
    i > 0 ? g.next(i) : g.next(),
    { value: returnValue, done: true }
  );
};

// A version of `throw` whose behavior can't be statically analyzed.
// Useful for testing dynamic exception dispatching.
exports.raise = function raise(argument) {
  throw argument;
};

exports.assertAlreadyFinished = function assertAlreadyFinished(generator) {
  var item = generator.next();
  assert.ok(item.done && item.value === undefined, "not finished");
};
