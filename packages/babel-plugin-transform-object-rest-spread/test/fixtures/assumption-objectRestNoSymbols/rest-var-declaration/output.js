var {
    a,
    b
  } = obj,
  c = babelHelpers.objectWithoutPropertiesLoose(obj, ["a", "b"]);
