class Universe {
  answer() {
    return 42;
  }
}

// ----------------------------------------------------------------------------

var universe = new Universe();
expect(universe.answer()).toBe(42);

var keys = [];
for (var key in universe) {
  keys.push(key);
}
expect(keys).not.toContain('answer');
expect(keys).not.toContain('constructor');

for (var key in Universe) {
  fail('Universe contains static member : ' + key);
}
