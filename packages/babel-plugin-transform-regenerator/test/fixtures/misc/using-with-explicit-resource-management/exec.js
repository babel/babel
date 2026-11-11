const log = [];
function resource(name) {
  return {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      log.push("dispose " + name);
    },
  };
}

function* f() {
  using a = resource("a");
  log.push(yield 1);
  {
    using b = resource("b");
    log.push(yield 2);
  }
  log.push("end");
}

const it = f();
expect(it.next().value).toBe(1);
expect(it.next("x").value).toBe(2);
expect(log).toEqual(["x"]);
expect(it.next("y").done).toBe(true);
expect(log).toEqual(["x", "y", "dispose b", "end", "dispose a"]);
