function render(text) {
  var _ref =
  /*#__PURE__*/
  <foo>{text}</foo>;

  return function () {
    return _ref;
  };
}

var Foo2 = require("Foo");

function createComponent(text) {
  var _ref2 =
  /*#__PURE__*/
  <Foo2>{text}</Foo2>;

  return function render() {
    return _ref2;
  };
}
