return (async function () {
  let log = [];

  function disposable(name, symbolName, cb){
    return {
      async [Symbol[symbolName] || Symbol.for("Symbol." + symbolName)]() {
        log.push(name);
        if (cb) cb();
      }
    };
  }

  let inBmicrotick = false;
  let inBmicrotickWhileC = false;
  let inBmicrotickWhileD = false;
  let inBmicrotickWhileE = false;
  {
    using e = disposable("e", "dispose", () => {
      inBmicrotickWhileE = inBmicrotick;
    });
    await using d = disposable("d", "asyncDispose", () => {
      inBmicrotickWhileD = inBmicrotick;
    });
    using c = disposable("c", "dispose", () => {
      inBmicrotickWhileC = inBmicrotick;
    });
    using b = disposable("b", "dispose", () => {
      inBmicrotick = true;
      Promise.resolve().then(() => {
        inBmicrotick = false;
      });
    });
    await using a = disposable("a", "asyncDispose");
  }

  expect(log).toEqual(["a", "b", "c", "d", "e"]);
  expect(inBmicrotick).toBe(false);
  expect(inBmicrotickWhileC).toBe(true);
  expect(inBmicrotickWhileD).toBe(true);
  expect(inBmicrotickWhileE).toBe(false);
})();
