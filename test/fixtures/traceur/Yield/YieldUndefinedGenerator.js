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

assert.equal('1undefined2', accumulate(yieldUndefinedGenerator1()));
assert.equal('1undefined2', accumulate(yieldUndefinedGenerator2()));
