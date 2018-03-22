function* tryFinallyGenerator() {
  var x = 1;
  var y;

  // finally inside a catch
  try {
    try {
      yield x;
      throw 7;
      x = 2;
    } finally {
      x = 3;
    }
  } catch (e) {
    y = e;
  }
  yield x * y;

  // finally with no enclosing try
  try {
    y = 11;
    yield y;
  } finally {
    y = 3;
  }
  yield y;
}

function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

// ----------------------------------------------------------------------------

expect(accumulate(tryFinallyGenerator())).toBe('121113');
