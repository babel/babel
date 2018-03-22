var finallyVisited = false;

function* test() {
  try {
    yield 42;
  } finally {
    finallyVisited = true;
  }
}

var it = test();
expect({value: 42, done: false}).toEqual(it.next());
expect(finallyVisited).toBe(false);

expect({value: undefined, done: true}).toEqual(it.next());
expect(finallyVisited).toBe(true);

finallyVisited = false;
for (var i of test()) {
  expect(42).toBe(i);
}
expect(finallyVisited).toBe(true);
