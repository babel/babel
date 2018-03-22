class Empty {}

class EmptyB extends Empty {
}

// ----------------------------------------------------------------------------

var e = new Empty();
expect(e).not.toBeNull();

for (var element in e) {
  expect('constructor').toBe(element);
}

for (var element in Empty) {
  fail('Empty contains static member : ' + element);
}

// Instances should be different.
var e2 = new Empty();
expect(e).not.toBe(e2);

expect(e instanceof Empty).toBe(true);
expect(e instanceof EmptyB).toBe(false);

var b = new EmptyB();

expect(b instanceof Empty).toBe(true);
expect(b instanceof EmptyB).toBe(true);
