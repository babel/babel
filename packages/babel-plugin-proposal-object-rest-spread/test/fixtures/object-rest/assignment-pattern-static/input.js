function foo() {
  const {
    Global: {
      classes,
      ...InputPropsOther
    } = this,
    ...other
  } = props;
}

