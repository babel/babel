function render(offset) {
  var _div;
  return function () {
    return _div || (_div = <div tabIndex={offset + 1} />);
  };
}
