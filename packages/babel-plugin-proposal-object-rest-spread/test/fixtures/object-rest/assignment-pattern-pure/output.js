function foo() {
  var _props$Global;

  const {
    Global: {
      classes
    } = {
      foo: 1
    }
  } = props,
        InputPropsOther = babelHelpers.objectWithoutProperties((_props$Global = props.Global, _props$Global !== void 0 ? _props$Global : {
    foo: 1
  }), ["classes"]),
        other = babelHelpers.objectWithoutProperties(props, ["Global"]);
}
