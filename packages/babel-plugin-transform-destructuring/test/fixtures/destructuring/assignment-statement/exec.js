var a, b;
var log = [];
function f() {
  return {
    [Symbol.iterator]() {
      var i = 0;
      return {
        next() {
          log.push("next");
          return { value: ++i, done: false };
        },
        return() {
          log.push("return");
          return {};
        },
      };
    },
  };
}

[a, b] = f();
;

expect(a).toBe(1);
expect(b).toBe(2);
expect(log).toEqual(["next", "next", "return"]);
