if (foo) foobar();

if (foo) {
  foobar();
}

if (foo) {}

if (foo) {
  foo();
} else bar();

if (foo) {
  foo();
} else {
  bar();
}

if (foo) {
  foo();
} else if (bar) {
  foobar();
} else {
  bar();
}
