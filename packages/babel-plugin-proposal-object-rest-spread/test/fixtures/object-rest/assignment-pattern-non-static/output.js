var _foo, _props$InputProps;

const _foo = {
  foo: 1
},
      {
  InputProps: {
    classes
  } = _foo
} = props,
      InputPropsOther = babelHelpers.objectWithoutProperties((_props$InputProps = props.InputProps, _props$InputProps !== void 0 ? _props$InputProps : _foo), ["classes"]),
      other = babelHelpers.objectWithoutProperties(props, ["InputProps"]);
