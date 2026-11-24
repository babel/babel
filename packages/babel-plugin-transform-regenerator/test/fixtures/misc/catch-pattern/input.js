var message = "outer";

function* gen() {
  try {
    throw new Error("inner");
  } catch ({ message, cause: [first, second = first] = [] }) {
    yield [message, first, second, () => message];
  }
  yield message;
}
