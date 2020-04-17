function render() {
  const bar = "bar", renderFoo = () => <foo bar={bar} />;

  return renderFoo();
}

function render() {
  const bar = "bar", renderFoo = () => <foo bar={bar} baz={baz} />, baz = "baz";

  return renderFoo();
}
