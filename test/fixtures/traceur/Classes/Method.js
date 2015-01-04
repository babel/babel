class Universe {
  answer() {
    return 42;
  }
}

// ----------------------------------------------------------------------------

var universe = new Universe();
assert.equal(42, universe.answer());

var keys = [];
for (var key in universe) {
  keys.push(key);
}
assert.isTrue(keys.indexOf('answer') !== -1);
assert.isTrue(keys.indexOf('constructor') === -1);

for (var key in Universe) {
  fail('Universe contains static member : ' + key);
}
