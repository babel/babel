function* forLexicallyNestedGenerator() {
  yield* (function*() { yield [1,2,3]; yield* [4,5,6]; })();
}

function accumulate(iterator) {
  var result = '';
  for (var value of iterator) {
    result = result + String(value);
  }
  return result;
}

// ----------------------------------------------------------------------------

assert.equal('1,2,3456', accumulate(forLexicallyNestedGenerator()));
