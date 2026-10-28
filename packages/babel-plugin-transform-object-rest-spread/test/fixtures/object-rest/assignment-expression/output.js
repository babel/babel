var _c, _c2;
({
  a1
} = c1);
({
  a2
} = _c = c2), b2 = babelHelpers.objectWithoutProperties(_c, ["a2"]);
console.log(({
  a3
} = _c2 = c3, b3 = babelHelpers.objectWithoutProperties(_c2, ["a3"]), _c2));
