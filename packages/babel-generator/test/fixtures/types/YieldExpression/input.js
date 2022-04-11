function* foo() {
  yield bar;
}

function* bar() {
  yield* foo();
}
