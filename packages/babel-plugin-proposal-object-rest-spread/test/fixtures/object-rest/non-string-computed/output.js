const a = {
  "3": "three",
  "foo": "bar"
};
const {
  [3]: omit
} = a,
      rest = babelHelpers.objectWithoutProperties(a, ["3"]);
assert.deepEqual(rest, {
  "foo": "bar"
});
assert.equal(omit, "three");
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
  [k1]: v1,
  [k2]: v2,
  [k3]: v3,
  [k4]: v4,
  [k5]: v5
} = c,
      vrest = babelHelpers.objectWithoutProperties(c, [k1, k2, k3, k4, k5].map(babelHelpers.toPropertyKey));
assert.equal(v1, "1");
assert.equal(v2, "2");
assert.equal(v3, "3");
assert.equal(v4, "4");
assert.equal(v5, "5");
assert.deepEqual(vrest, {}); // shouldn't convert symbols to strings

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
assert.equal(dx, "sx");
assert.equal(dy, "sy");
