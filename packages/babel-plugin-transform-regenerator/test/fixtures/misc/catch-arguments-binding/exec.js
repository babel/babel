function* pattern() {
  try {
    throw { arguments: 2 };
  } catch ({ arguments }) {
    yield arguments;
  }
  yield arguments[0];
}

function* identifier() {
  try {
    throw 2;
  } catch (arguments) {
    yield arguments;
  }
  yield arguments[0];
}

expect([...pattern(5)]).toEqual([2, 5]);
expect([...identifier(5)]).toEqual([2, 5]);
