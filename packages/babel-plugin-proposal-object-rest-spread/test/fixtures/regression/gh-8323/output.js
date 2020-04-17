function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const get = () => {
  fireTheMissiles();
  return 3;
};

const f = (_ref) => {
  let {
    a = get(),
    b
  } = _ref,
      z = _objectWithoutPropertiesLoose(_ref, ["a", "b", "c"]);

  const v = b + 3;
};
