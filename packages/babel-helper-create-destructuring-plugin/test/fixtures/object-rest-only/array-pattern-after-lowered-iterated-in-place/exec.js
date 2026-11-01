// An array pattern following a lowered element is still iterated before the
// outer iterator is closed, but its targets are only bound after the lowered
// element is destructured.
var log = [];
function iterable(tag, values) {
  return {
    [Symbol.iterator]() {
      var i = 0;
      return {
        next() {
          log.push(tag + "next");
          return i < values.length
            ? { done: false, value: values[i++] }
            : { done: true };
        },
        return() {
          log.push(tag + "return");
          return {};
        },
      };
    },
  };
}

var [{ ...r }, [a]] = iterable("o", [{}, iterable("i", [1, 2])]);
expect(a).toBe(1);
expect(log).toEqual(["onext", "onext", "inext", "ireturn", "oreturn"]);

log = [];
var b, c, d;
[{ ...r }, [b, [c] = [3], ...d]] = iterable("o", [
  {},
  iterable("i", [1, undefined, 4]),
]);
expect([b, c, d]).toEqual([1, 3, [4]]);
expect(log).toEqual([
  "onext",
  "onext",
  "inext",
  "inext",
  "inext",
  "inext",
  "oreturn",
]);

log = [];
function* outer() {
  try {
    yield {};
    yield (function* () {
      log.push("inner");
      yield 1;
    })();
  } finally {
    log.push("cleanup");
  }
}
var [{ ...s }, [e]] = outer();
expect(e).toBe(1);
expect(log).toEqual(["inner", "cleanup"]);

var z = 0;
expect(() => {
  [{ ...r }, [z]] = [null, [1]];
}).toThrow(TypeError);
expect(z).toBe(0);

var y = 0;
expect(() => {
  [{ ...r }, [{ y }]] = [null, [{ y: 1 }]];
}).toThrow(TypeError);
expect(y).toBe(0);

var [{ f = () => typeof x, g = f(), ...t }, [x = 1]] = [{}, []];
expect(g).toBe("undefined");
expect(x).toBe(1);
