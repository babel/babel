function* foo() {
  return (yield* bar()) + (yield* bar());
}

function* bar() {
  return (yield 2) + (yield 3);
}
