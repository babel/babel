function render(Component, text = '') {
  return function() {
    return <Component text={text} />;
  }
}
