const _excluded = ["a", "b", "c"];
const get = () => {
  fireTheMissiles();
  return 3;
};
const f = _ref => {
  let {
      a = get(),
      b
    } = _ref,
    z = babelHelpers.objectWithoutPropertiesLoose(_ref, _excluded);
  const v = b + 3;
};
