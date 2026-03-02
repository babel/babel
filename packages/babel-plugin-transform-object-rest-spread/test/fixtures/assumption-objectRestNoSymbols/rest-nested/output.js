let {
    a,
    nested: {
      b,
      c
    },
    e
  } = obj,
  d = babelHelpers.objectWithoutPropertiesLoose(obj.nested, ["b", "c"]);
