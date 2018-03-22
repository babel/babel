// finally inside a try finally
function* tryFinallyFinallyGenerator() {
  var y;

  try {
    y = 13;
    try {
      yield y;
    } finally {
      y = 17;
    }
    yield y;
  } finally {
    y = 23;
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

expect(accumulate(tryFinallyFinallyGenerator())).toBe('131723');
