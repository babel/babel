var _foo;
function render() {
  return _foo || (_foo = /*#__PURE__*/babelHelpers.jsx("foo", {}));
}
function render() {
  var _foo2;
  var text = getText();
  return function () {
    return _foo2 || (_foo2 = /*#__PURE__*/babelHelpers.jsx("foo", {}, void 0, text));
  };
}
