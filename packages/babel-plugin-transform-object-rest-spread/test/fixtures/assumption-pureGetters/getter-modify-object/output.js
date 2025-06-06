let a = {
  get x() {
    a = {
      z: 2
    };
  },
  y: 2
};
let x, rest;
({
  x
} = a), rest = babelHelpers.objectWithoutProperties(a, ["x"]), a;
