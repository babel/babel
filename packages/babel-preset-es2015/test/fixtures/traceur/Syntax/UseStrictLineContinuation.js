function testUseStrictLineContinuation() {
  'use \
strict';
  return this;
}

expect(testUseStrictLineContinuation()).not.toBeUndefined();
