function render(text) {
  var _div;
  text += "yes";
  return function () {
    return _div || (_div = <div>{text}</div>);
  };
}
