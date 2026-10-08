const log = [];
let f = (...args) => args;
const g = (log.push("callee"), f)~((log.push("x"), "x"), ?, ...(log.push("rest"), ["y", "z"]));
expect(log).toEqual(["callee", "x", "rest"]);

// The callee is fixed when partially applied
f = null;
expect(g(1)).toEqual(["x", 1, "y", "z"]);
expect(g(2)).toEqual(["x", 2, "y", "z"]);
expect(log).toEqual(["callee", "x", "rest"]);

// Fixed arguments are not shared between partial applications
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(((a, b) => [a, b])~(i, ?));
}
expect(fns.map(fn => fn("b"))).toEqual([[0, "b"], [1, "b"], [2, "b"]]);
