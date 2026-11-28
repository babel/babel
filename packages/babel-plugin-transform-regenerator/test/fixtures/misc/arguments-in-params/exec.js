function* computedKey(obj = { [arguments.length]() {} }) {
  yield Object.keys(obj);
}

function* defaultValue(a = arguments.length, b = this) {
  yield [a, b];
}

expect(computedKey().next().value).toEqual(["0"]);
const receiver = {};
expect(defaultValue.call(receiver).next().value).toEqual([0, receiver]);
