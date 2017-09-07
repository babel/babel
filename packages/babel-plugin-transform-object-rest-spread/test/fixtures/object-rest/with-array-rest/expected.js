let _a$c = {
  a: [1, 2, 3, 4],
  c: "zxcv"
},
    {
  a: [b, ...arrayRest]
} = _a$c,
    objectRest = babelHelpers.objectWithoutProperties(_a$c, ["a"]);
