function* forEachGenerator() {
  yield* forInGenerator3();
  yield* forInGenerator2();
}

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

function* forInGenerator2() {
  var object = {
    a: 0,
    b: 1,
    c: 2
  };
  var key;
  for (key in object) {
    if (key == 'a') {
      delete object.b;
      object.d = 3;
    }
    yield key;
    yield object[key];
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

expect(accumulate(forEachGenerator())).toBe('abcda0c2');
