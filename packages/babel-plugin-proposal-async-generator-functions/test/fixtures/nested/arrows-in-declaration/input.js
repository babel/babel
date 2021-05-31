async function* g() {
  () => this;
  function f() {
    () => this;
  }
  async () => {
    this;
    await 1;
  }
  await 1;
}
