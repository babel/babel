try {} catch (err) {}

try {
  bar;
} catch (err) {}

try {
  bar;
} catch (err) {
  foo();
}

try {
  bar;
} catch (err) {
  foo();
} finally {
  yay();
}

try {
  bar;
} catch (err) {
  foo();
} finally {}
