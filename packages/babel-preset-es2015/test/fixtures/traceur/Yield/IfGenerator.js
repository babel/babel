function* ifGenerator(condition) {
  if (condition) {
    yield 1;
  }
  if (!condition) {
    yield 2;
  }
  if (condition) {
    yield 3;
  } else {
    yield 4;
  }
}

function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

// ----------------------------------------------------------------------------

expect(accumulate(ifGenerator(true))).toBe('13');
expect(accumulate(ifGenerator(false))).toBe('24');
