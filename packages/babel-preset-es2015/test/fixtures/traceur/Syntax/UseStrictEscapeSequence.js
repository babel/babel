function testUseStrictEscapeSequence() {
  'use str\x69ct';
  return this;
}

assert.notEqual(testUseStrictEscapeSequence(), undefined);

