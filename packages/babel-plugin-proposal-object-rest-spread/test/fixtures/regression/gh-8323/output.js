const get = () => {
  fireTheMissiles();
  return 3;
};

const f = _ref => {
  let {
    a = get(),
    b
  } = _ref,
      z = babelHelpers.objectWithoutPropertiesLoose(_ref, ["a", "b", "c"]);
  const v = b + 3;
};
