// yield form within a catch block
function* tryCatchYieldGenerator() {
  var x = 3;
  try {
    throw 5;
  } catch (e) {
    yield e * x;
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

expect(accumulate(tryCatchYieldGenerator())).toBe('15');
