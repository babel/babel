var _state$foo;

var qux = {
  quux: 42
};
const {} = state,
      bar = babelHelpers.extends({}, (_state$foo = state.foo, _state$foo !== void 0 ? _state$foo : qux));
