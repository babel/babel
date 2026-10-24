it("es7.objectRestSpread", () => {
  let original = {
    a: 1,
    b: 2
  };
  let copy = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(original), original)), []);
});
