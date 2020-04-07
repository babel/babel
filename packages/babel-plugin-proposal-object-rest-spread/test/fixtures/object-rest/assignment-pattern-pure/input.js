function foo() {
  const {
    Global: {
      classes,
      ...InputPropsOther
    } = { foo: 1 },
    ...other
  } = props;
}

