function* forGenerator() {
  var a = 1, b = 1;
  for (var i = 0; i < 4; i++) {
    // TODO(jmesserly): this was changed until we get destructing
    //[a, b] = [b, a + b];
    var t0 = b;
    var t1 = a + b;
    a = t0;
    b = t1;

    yield a;
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

expect(accumulate(forGenerator())).toBe('1235');
