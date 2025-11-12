const _excluded = ["excluded", "excluded2", "used", "used2"],
  _excluded2 = ["unused"];
// should not remove when destructuring into existing bindings
({
  a2
} = c2), b2 = babelHelpers.objectWithoutProperties(c2, ["a2"]);
function render() {
  const _this$props = this.props,
    {
      used,
      used2: usedRenamed
    } = _this$props,
    props = babelHelpers.objectWithoutProperties(_this$props, _excluded);
  console.log(used, usedRenamed);
  return React.createElement("input", props);
}
function smth(_ref) {
  let rest = babelHelpers.objectWithoutProperties(_ref, _excluded2);
  call(rest);
}
