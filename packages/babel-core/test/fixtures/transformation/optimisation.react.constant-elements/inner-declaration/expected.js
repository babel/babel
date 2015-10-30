function render() {
  var text = getText();

  var _ref = <foo>{text}</foo>;

  return function () {
    return _ref;
  };
}
