let _a$d = {
  a: [1, 2, 3, 4],
  d: "oyez"
},
    {
  a: [b, ...arrayRest],
  c = function (...functionRest) {}
} = _a$d,
    objectRest = babelHelpers.objectWithoutProperties(_a$d, ["a", "c"]);
