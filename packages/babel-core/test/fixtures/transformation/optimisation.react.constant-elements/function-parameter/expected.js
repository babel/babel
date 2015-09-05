function render(text) {
  var _ref = <foo>{text}</foo>;

  return function () {
    return _ref;
  };
}

var Foo2 = require("Foo");

function createComponent(text) {
  var _ref2 = <Foo2>{text}</Foo2>;

  return function render() {
    return _ref2;
  };
}
