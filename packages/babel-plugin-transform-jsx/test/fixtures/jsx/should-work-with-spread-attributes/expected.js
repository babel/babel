var objectA = { x1: 1, y1: 2, z1: 3 };
var objectB = { x2: 1, y2: 2, z2: 3 };
var jsxA = {
  element: "div",
  attributes: babelHelpers.extends({}, objectA),
  children: []
};
var jsxB = {
  element: "div",
  attributes: babelHelpers.extends({
    a: 1,
    b: 2
  }, objectA),
  children: []
};
var jsxC = {
  element: "div",
  attributes: babelHelpers.extends({}, objectA, {
    a: 1,
    b: 2
  }),
  children: []
};
var jsxD = {
  element: "div",
  attributes: babelHelpers.extends({
    a: 1
  }, objectA, {
    b: 2
  }),
  children: []
};
var jsxE = {
  element: "div",
  attributes: babelHelpers.extends({
    a: 1
  }, objectA, objectB, {
    b: 2
  }),
  children: []
};
var jsxF = {
  element: "div",
  attributes: babelHelpers.extends({
    a: 1
  }, objectA, {
    b: 2
  }, objectB, {
    c: 3
  }),
  children: []
};
