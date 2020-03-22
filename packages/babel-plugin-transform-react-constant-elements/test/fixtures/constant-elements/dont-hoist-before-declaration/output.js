function render() {
  const bar = "bar",
        _ref = <foo bar={bar} />,
        renderFoo = () => _ref;

  return renderFoo();
}

function render() {
  const bar = "bar",
        renderFoo = () => _ref2,
        baz = "baz",
        _ref2 = <foo bar={bar} baz={baz} />;

  return renderFoo();
}
