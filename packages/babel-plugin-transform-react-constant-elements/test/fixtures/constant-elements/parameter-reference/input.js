function render(text) {
  return function () {
    return <div>{text}</div>;
  };
}

function render() {
  return function (text) {
    return <div>{text}</div>;
  };
}
