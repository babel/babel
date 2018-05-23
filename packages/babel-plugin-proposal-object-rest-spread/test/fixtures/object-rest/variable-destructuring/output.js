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
