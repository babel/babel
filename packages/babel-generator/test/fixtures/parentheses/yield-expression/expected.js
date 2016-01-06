function* asdf() {
  yield 1 || yield 2;
  (yield b)();
  new (yield b)();
  true ? yield 1 : yield 2;
  yield yield 1;
}

function* a(b) {
  (yield xhr({ url: "views/test.html" })).data;
}
