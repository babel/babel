const _temp = ["excluded", "excluded2", "used", "used2"],
      _temp2 = ["unused"];
// should not remove when destructuring into existing bindings
var _c = c2;
({
  a2
} = _c);
b2 = babelHelpers.objectWithoutPropertiesLoose(_c, ["a2"]);
_c;

class Comp extends React.Component {
  render() {
    const _this$props = this.props,
          {
      used,
      used2: usedRenamed
    } = _this$props,
          props = babelHelpers.objectWithoutPropertiesLoose(_this$props, _temp);
    console.log(used, usedRenamed);
    return React.createElement("input", props);
  }

}

function smth(_ref) {
  let rest = babelHelpers.objectWithoutPropertiesLoose(_ref, _temp2);
  call(rest);
}
