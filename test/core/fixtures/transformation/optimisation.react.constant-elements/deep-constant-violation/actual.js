function render() {
  var children = <b></b>;

  if (someCondition) {
    children = <span></span>;
  }

  return <div>{children}</div>;
}
