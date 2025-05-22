function* foo(l) {
  yield* (
    l()
  );
}

function* foo2() {
  yield* (
    l() && m()
  ) || n();
}
