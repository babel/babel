function render(text) {
  return function () {
    return <foo>{text}</foo>;
  };
}

var Foo2 = require("Foo");

function createComponent(text) {
  return function render() {
    return <Foo2>{text}</Foo2>;
  };
}
