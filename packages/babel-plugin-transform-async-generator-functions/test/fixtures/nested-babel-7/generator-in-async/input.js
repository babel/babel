async function f() {
  await 1;
  async function* g() {
    await 2;
    yield 3;
  }
}
