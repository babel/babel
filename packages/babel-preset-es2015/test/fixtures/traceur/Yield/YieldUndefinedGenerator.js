function* yieldUndefinedGenerator1() {
  yield 1;
  yield;
  yield 2;
}

function* yieldUndefinedGenerator2() {
  yield 1;
  yield undefined;
  yield 2;
}

function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

// ----------------------------------------------------------------------------

expect(accumulate(yieldUndefinedGenerator1())).toBe('1undefined2');
expect(accumulate(yieldUndefinedGenerator2())).toBe('1undefined2');
