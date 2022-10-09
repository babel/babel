var _b, _span;
function render() {
  var children = _b || (_b = <b></b>);
  if (someCondition) {
    children = _span || (_span = <span></span>);
  }
  return <div>{children}</div>;
}
