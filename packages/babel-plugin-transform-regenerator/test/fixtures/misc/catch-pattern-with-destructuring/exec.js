var message = "outer";

function* gen() {
  try {
    throw new Error("inner");
  } catch ({ message }) {
    yield message;
  }
  yield message;
}

expect([...gen()]).toEqual(["inner", "outer"]);
