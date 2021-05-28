const _exclude = ["excluded", "excluded2", "used", "used2"],
      _exclude2 = ["unused"];
// should not remove when destructuring into existing bindings
var _c = c2;
({
  a2
} = _c);
b2 = babelHelpers.objectWithoutProperties(_c, ["a2"]);
_c;

function render() {
  const _this$props = this.props,
        {
    used,
    used2: usedRenamed
  } = _this$props,
        props = babelHelpers.objectWithoutProperties(_this$props, _exclude);
  console.log(used, usedRenamed);
  return React.createElement("input", props);
}

function smth(_ref) {
  let rest = babelHelpers.objectWithoutProperties(_ref, _exclude2);
  call(rest);
}
