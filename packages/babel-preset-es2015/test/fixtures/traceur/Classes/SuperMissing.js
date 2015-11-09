class MissingSuperA {}

class MissingSuperB extends MissingSuperA {
  method() {
    return super.foo();
  }
  field() {
    return super.foo;
  }
}

// ----------------------------------------------------------------------------

// Collect the expected values.
var expectedF;
var expectedM;
var actualF;
var actualM;

expectedF = ({}).x;
try {
  ({}).method();
} catch (e) {
  expectedM = e;
}

// Test against those.
var b = new MissingSuperB();
var actualF = b.field();
var actualM;
try {
  b.method();
} catch (e) {
  actualM = e;
}

assert.equal(actualF, expectedF);
assert.instanceOf(expectedM, TypeError);
assert.instanceOf(actualM, TypeError);
assert.equal(Object.getPrototypeOf(actualM), Object.getPrototypeOf(expectedM));
