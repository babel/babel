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

// The array pattern of a parameter is kept in the parameter list (which is
// transformed by @babel/plugin-transform-parameters, if needed): its nested
// patterns are iterated before the outer iterator is closed.
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

log = [];
function g([[{ ...r }], a] = x) {
  return [r, a];
}
expect(g(it("outer", [it("inner", [{ y: 1 }]), 2]))).toEqual([{ y: 1 }, 2]);
expect(log).toEqual([
  "outer.next",
  "inner.next",
  "inner.return",
  "outer.next",
  "outer.return",
]);

function h(...[a, { ...r }]) {
  return [a, r];
}
expect(h(1, { z: 2 })).toEqual([1, { z: 2 }]);
