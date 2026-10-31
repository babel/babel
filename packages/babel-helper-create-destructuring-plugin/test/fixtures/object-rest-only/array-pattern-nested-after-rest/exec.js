function it(name, values) {
  let i = 0;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          log.push(name + ".next");
          return i < values.length ? { value: values[i++], done: false } : { done: true };
        },
        return() {
          log.push(name + ".return");
          return { done: true };
        },
      };
    },
  };
}

// A nested pattern that doesn't need to be lowered stays in the native
// pattern: it is iterated before the outer iterator is closed.
var log = [];
function f([{ ...r }, [a]]) {
  return [r, a];
}
expect(f(it("outer", [{ x: 1 }, it("inner", [2])]))).toEqual([{ x: 1 }, 2]);
expect(log).toEqual([
  "outer.next",
  "outer.next",
  "inner.next",
  "inner.return",
  "outer.return",
]);

// An element reading a binding of a lowered one is destructured after it
var [{ ...s }, [b = s], c] = [{ y: 1 }, [], 3];
expect([b, c]).toEqual([{ y: 1 }, 3]);
