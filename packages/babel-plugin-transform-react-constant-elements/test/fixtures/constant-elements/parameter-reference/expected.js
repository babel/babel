function render(text) {
  var _ref = <div>{text}</div>;

  return function () {
    return _ref;
  };
}

function render() {
  return function (text) {
    return <div>{text}</div>;
  };
}
