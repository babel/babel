return async function () {
  let log = [];
  async function getDisposable() {
    function disposable() { log.push('call') }
    disposable[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")] = () => { log.push('dispose') };
    return disposable;
  }

  {
    await using x = getDisposable();
    x();
  }

  expect(log).toEqual(['call', 'dispose']);
}
