// should not remove when destructuring into existing bindings
({ a2, ...b2 } = c2);

function render() {
  const {
    excluded,
    excluded2: excludedRenamed,
    used,
    used2: usedRenamed,
    ...props
  } = this.props;

  console.log(used, usedRenamed);

  return React.createElement("input", props);
}

function smth({ unused, ...rest }) {
  call(rest);
}
