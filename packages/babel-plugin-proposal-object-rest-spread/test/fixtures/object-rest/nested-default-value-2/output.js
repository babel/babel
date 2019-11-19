const {
  InputProps: {
    classes
  } = {
    foo: 1
  }
} = props,
      InputPropsOther = babelHelpers.objectWithoutProperties(props.InputProps, ["classes"]),
      other = babelHelpers.objectWithoutProperties(props, ["InputProps"]);
