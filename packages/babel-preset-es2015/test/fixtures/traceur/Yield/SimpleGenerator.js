function* simpleGenerator() {
  yield 1;
}

function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

// ----------------------------------------------------------------------------

expect(accumulate(simpleGenerator())).toBe('1');
