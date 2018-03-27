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

expect(e).toBeInstanceOf(Empty);
expect(e).not.toBeInstanceOf(EmptyB);

var b = new EmptyB();

expect(b).toBeInstanceOf(Empty);
expect(b).toBeInstanceOf(EmptyB);
