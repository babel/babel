function testUseStrictLineContinuation() {
  'use \
strict';
  return this;
}

assert.notEqual(testUseStrictLineContinuation(), undefined);
