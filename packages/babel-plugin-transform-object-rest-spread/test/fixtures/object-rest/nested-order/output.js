const bar = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(obj.a), obj.a)),
  baz = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(obj.b), obj.b)),
  foo = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(obj), obj));
