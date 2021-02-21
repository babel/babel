function foo() {
  var _props$Global;

  const {
    Global: {
      classes
    } = this
  } = props,
        InputPropsOther = babelHelpers.objectWithoutProperties((_props$Global = props.Global, _props$Global !== void 0 ? _props$Global : this), ["classes"]),
        other = babelHelpers.objectWithoutProperties(props, ["Global"]);
}
