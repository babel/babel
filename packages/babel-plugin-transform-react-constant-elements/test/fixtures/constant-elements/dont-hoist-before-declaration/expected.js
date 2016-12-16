function render() {
  const bar = "bar",
        _ref = <foo bar={bar} />,
        renderFoo = () => _ref;

  return renderFoo();
}

function render() {
  const bar = "bar",
        renderFoo = () => <foo bar={bar} baz={baz} />,
        baz = "baz";

  return renderFoo();
}