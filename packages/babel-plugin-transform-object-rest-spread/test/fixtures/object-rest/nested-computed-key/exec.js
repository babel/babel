var d;

const {
  [({ ...rest }) => {
    let { ...b } = {};
  }]: a,
  [({ ...d } = {})]: c,
} = {};

expect(a).toBeUndefined();
expect(c).toBeUndefined();
expect(d).toEqual({});

// The same pattern, with a source that has the computed keys. The key
// function is converted to a property key with a stubbed `toString`, which
// also captures it so that it can be called.
var keyFunctions = [];
var functionToString = Function.prototype.toString;
Function.prototype.toString = function () {
  keyFunctions.push(this);
  return "functionKey";
};
try {
  var {
    [({ ...rest }) => {
      let { ...b } = {};
      return [rest, b];
    }]: a2,
    [({ ...d } = { y: 2 })]: c2,
  } = { functionKey: "a2", "[object Object]": "c2" };
} finally {
  Function.prototype.toString = functionToString;
}

expect(a2).toBe("a2");
expect(c2).toBe("c2");
expect(d).toEqual({ y: 2 });
expect(keyFunctions).toHaveLength(1);
var arg = { x: 1 };
var [rest, b] = keyFunctions[0](arg);
expect(rest).toEqual({ x: 1 });
expect(rest).not.toBe(arg);
expect(b).toEqual({});
