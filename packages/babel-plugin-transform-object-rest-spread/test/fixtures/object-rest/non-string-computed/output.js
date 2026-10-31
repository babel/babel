var _k, _k2, _k3, _k4, _k5;
const a = {
  "3": "three",
  "foo": "bar"
};
const {
    [3]: omit
  } = a,
  rest = babelHelpers.objectWithoutProperties(a, ["3"]);
expect(rest).toEqual({
  "foo": "bar"
});
expect(omit).toBe("three");
const [k1, k2, k3, k4, k5] = [null, undefined, true, false, {
  toString() {
    return "warrior";
  }
}];
const c = {
  [k1]: "1",
  [k2]: "2",
  [k3]: "3",
  [k4]: "4",
  [k5]: "5"
};
const {
    [_k = babelHelpers.toPropertyKey(k1)]: v1,
    [_k2 = babelHelpers.toPropertyKey(k2)]: v2,
    [_k3 = babelHelpers.toPropertyKey(k3)]: v3,
    [_k4 = babelHelpers.toPropertyKey(k4)]: v4,
    [_k5 = babelHelpers.toPropertyKey(k5)]: v5
  } = c,
  vrest = babelHelpers.objectWithoutProperties(c, [_k, _k2, _k3, _k4, _k5]);
expect(v1).toBe("1");
expect(v2).toBe("2");
expect(v3).toBe("3");
expect(v4).toBe("4");
expect(v5).toBe("5");
expect(vrest).toEqual({});

// shouldn't convert symbols to strings
const sx = Symbol();
const sy = Symbol();
const d = {
  [sx]: "sx",
  [sy]: "sy"
};
const {
  [sx]: dx,
  [sy]: dy
} = d;
expect(dx).toBe("sx");
expect(dy).toBe("sy");
