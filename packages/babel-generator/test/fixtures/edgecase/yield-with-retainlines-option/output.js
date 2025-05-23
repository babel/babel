function* foo(l) {
  yield (
    l);

}

function* foo2() {
  yield (
    1 && 2) ||
  3;
}

function* foo3() {
  (yield /* comment
  */) + "";
}