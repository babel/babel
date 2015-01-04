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

assert.equal('1', accumulate(simpleGenerator()));
