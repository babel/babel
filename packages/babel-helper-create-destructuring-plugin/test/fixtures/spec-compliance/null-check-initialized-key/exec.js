// RequireObjectCoercible happens before the computed key is evaluated. The
// check can be left to the property access only when reading the key can't
// throw or run user code.
const log = [];
const key = { toString() { log.push("toString"); return "a"; } };
function f(k, o) {
  var j = key;
  const { [k]: a } = o;
  const { [j]: b } = o;
  return [a, b];
}
expect(() => f(key, null)).toThrow(TypeError);
expect(log).toEqual([]);
expect(f(key, { a: 1 })).toEqual([1, 1]);
expect(log).toEqual(["toString", "toString"]);

// `l` is still in its TDZ when `g` is called
const g = () => {
  const { [l]: d } = null;
};
expect(g).toThrow(TypeError);
let l = "a";

// A case can skip the declaration of `m`
switch (1) {
  case 0:
    let m = "a";
  // fallthrough
  case 1:
    expect(() => {
      const { [m]: e } = undefined;
    }).toThrow(TypeError);
}

// Reading an undeclared global throws a ReferenceError
expect(() => {
  const { [undeclaredGlobalKey]: h } = null;
}).toThrow(TypeError);
