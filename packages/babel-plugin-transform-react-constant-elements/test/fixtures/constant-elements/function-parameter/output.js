function render(text) {
  var _foo;
  return function () {
    return _foo || (_foo = <foo>{text}</foo>);
  };
}
var Foo2 = require("Foo");
function createComponent(text) {
  var _Foo;
  return function render() {
    return _Foo || (_Foo = <Foo2>{text}</Foo2>);
  };
}
