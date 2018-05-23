function testUseStrictEscapeSequence() {
  'use str\x69ct';
  return this;
}

expect(testUseStrictEscapeSequence()).not.toBeUndefined();

