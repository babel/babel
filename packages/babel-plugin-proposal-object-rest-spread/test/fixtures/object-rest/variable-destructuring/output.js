var z = {};
var x = babelHelpers.extends({}, z);
var a = babelHelpers.extends({}, {
  a: 1
});
var x = babelHelpers.extends({}, a.b);
var x = babelHelpers.extends({}, a());
var {
  x1
} = z,
    y1 = babelHelpers.objectWithoutProperties(z, ["x1"]);
x1++;
var {
  [a]: b
} = z,
    c = babelHelpers.objectWithoutProperties(z, [a].map(babelHelpers.toPropertyKey));
var {
  x1
} = z,
    y1 = babelHelpers.objectWithoutProperties(z, ["x1"]);
let {
  x2,
  y2
} = z,
    z2 = babelHelpers.objectWithoutProperties(z, ["x2", "y2"]);
const {
  w3,
  x3,
  y3
} = z,
      z4 = babelHelpers.objectWithoutProperties(z, ["w3", "x3", "y3"]);
let {
  x: {
    a: xa,
    [d]: f
  }
} = complex,
    asdf = babelHelpers.objectWithoutProperties(complex.x, ["a", d].map(babelHelpers.toPropertyKey)),
    d = babelHelpers.extends({}, complex.y),
    g = babelHelpers.objectWithoutProperties(complex, ["x"]);
let {} = z,
    y4 = babelHelpers.extends({}, z.x4);

let _z = z(),
    {
  x5: {
    w5
  }
} = _z,
    y5 = babelHelpers.objectWithoutProperties(_z.x5, ["w5"]);

let _z2 = z(),
    {
  x6: {
    w6: {
      a6
    }
  }
} = _z2,
    y6 = babelHelpers.objectWithoutProperties(_z2.x6.w6, ["a6"]);

let _z3 = z(),
    {
  x7: {
    e7,
    r7
  },
  q7: {
    w7: {
      a7
    }
  }
} = _z3,
    y7 = babelHelpers.objectWithoutProperties(_z3.q7.w7, ["a7"]);

let _z4 = z(),
    {
  x8
} = _z4,
    y8 = babelHelpers.objectWithoutProperties(_z4, ["x8"]);

let _z5 = z(),
    {
  x9: {
    w9: {
      a9
    }
  },
  x10: {
    a10
  }
} = _z5,
    y9 = babelHelpers.objectWithoutProperties(_z5.x9.w9, ["a9"]),
    y10 = babelHelpers.objectWithoutProperties(_z5.x10, ["a10"]);
