it("es7.objectRestSpread", () => {
  let original = {
    a: 1,
    b: 2
  };
  let copy = babelHelpers.objectWithoutProperties((babelHelpers.objectDestructuringEmpty(original), original), []);
});
