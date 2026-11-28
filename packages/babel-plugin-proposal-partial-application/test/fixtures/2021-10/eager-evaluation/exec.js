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

// `yield` in fixed arguments is evaluated by the enclosing generator
function* gen() {
  return ((a, b) => a + b)~(yield, ?);
}
const it = gen();
it.next();
expect(it.next(10).value(5)).toBe(15);

// Fixed arguments are evaluated once, and shared by every call
const same = ((...args) => args)~({}, [], /a/g, `${"t"}`, ?);
const [first, second] = [same(1), same(2)];
for (let i = 0; i < 4; i++) {
  expect(first[i]).toBe(second[i]);
}

// `arguments` refers to the enclosing function
function withArguments() {
  return ((a, b) => [a, b])~(arguments[0], ?);
}
expect(withArguments("a")("b")).toEqual(["a", "b"]);

// Spread arguments are iterated once
function* items() {
  yield 1;
  yield 2;
}
const spread = ((...args) => args)~(...items(), ?);
expect(spread(3)).toEqual([1, 2, 3]);
expect(spread(4)).toEqual([1, 2, 4]);

// A `var` declared in a loop is not shared by the partial applications
const fromVar = [];
for (var j = 0; j < 3; j++) {
  var x = j;
  fromVar.push((a => a)~(x));
}
expect(fromVar.map(fn => fn())).toEqual([0, 1, 2]);
