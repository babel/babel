var _typeofReactElement = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;

var _ref = {
  $$typeof: _typeofReactElement,
  type: "foo",
  key: null,
  ref: null,
  props: {},
  _owner: null
};
function render() {
  return _ref;
}

function render() {
  var text = getText();
  var _ref2 = {
    $$typeof: _typeofReactElement,
    type: "foo",
    key: null,
    ref: null,
    props: {
      children: text
    },
    _owner: null
  };
  return function () {
    return _ref2;
  };
}
