var object = {
  a: 1,
  b: {
    c: 2
  }
};

var jsxA = {
  element: object.a,
  attributes: {},
  children: null
};
var jsxB = {
  element: object.b.c,
  attributes: {},
  children: null
};
var jsxC = {
  element: object.a,
  attributes: {},
  children: []
};
var jsxD = {
  element: object.b.c,
  attributes: {},
  children: []
};
var jsxE = {
  element: object.a,
  attributes: {},
  children: [object.a]
};
var jsxF = {
  element: object.b.c,
  attributes: {},
  children: [object.b.c]
};
