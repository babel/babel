function* myGenerator(n) {
  var _ref, _ref2;

  return _ref2 = n, (_ref = yield _ref2, Math.abs(_ref));
}

const myIterator = myGenerator(15);
const yieldedValue = myIterator.next().value;
const returnedValue = myIterator.next(-30).value;
expect(yieldedValue).toBe(15);
expect(returnedValue).toBe(30);
