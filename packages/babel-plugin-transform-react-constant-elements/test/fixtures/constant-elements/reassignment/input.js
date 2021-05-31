function render(text) {
  text += "yes";

  return function () {
    return <div>{text}</div>;
  };
}
