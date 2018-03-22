function* forInGenerator3() {
  var object = {
    a: 0,
    b: {
      c: 1,
    },
    d: 2
  };
  for (var key in object) {
    yield key;
    for (var key2 in object[key]) {
      yield key2;
    }
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

expect(accumulate(forInGenerator3())).toBe('abcd');
