function* foo() {
  (yield 1) || (yield 2);
  (yield b)();
  (yield b)?.();
  new (yield b)();
  (yield 1) ? yield 2 : yield 3;
  yield 1 ? 2 : 3;
  yield yield 1;
}

function* a(b) {
  (yield xhr({
    url: "views/test.html"
  })).data;
  (yield replay())?.data;
}

(async function* () {
  await (yield 1);
});