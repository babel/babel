const log = [];
function* gen() {
  log.push("next 1");
  yield undefined;
  log.push("next 2");
  yield 2;
}

// The default of the first lowered element is evaluated while iterating,
// before the next element.
const [{ ...a } = (log.push("default"), { x: 1 }), b] = gen();
expect([a, b]).toEqual([{ x: 1 }, 2]);
expect(log).toEqual(["next 1", "default", "next 2"]);

log.length = 0;
let c, d;
[{ ...c } = (log.push("default"), { y: 1 }), d] = gen();
expect([c, d]).toEqual([{ y: 1 }, 2]);
expect(log).toEqual(["next 1", "default", "next 2"]);

// The default reads a binding of a later element, not initialized yet
expect(() => {
  const [{ ...e } = f, f] = [undefined, 1];
}).toThrow(ReferenceError);

function* g([{ ...h } = typeof i, [i = 1]]) {}
expect(() => g([undefined, [undefined]])).toThrow(ReferenceError);
