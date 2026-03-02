function render() {
  var _foo;
  const bar = "bar",
    renderFoo = () => _foo || (_foo = <foo bar={bar} />);
  return renderFoo();
}
function render() {
  var _foo2;
  const bar = "bar",
    renderFoo = () => _foo2 || (_foo2 = <foo bar={bar} baz={baz} />),
    baz = "baz";
  return renderFoo();
}
