function render() {
  const bar = "bar",
        _ref =
  /*#__PURE__*/
  <foo bar={bar} />,
        renderFoo = () => _ref;

  return renderFoo();
}

function render() {
  const bar = "bar",
        renderFoo = () => _ref2,
        baz = "baz",
        _ref2 =
  /*#__PURE__*/
  <foo bar={bar} baz={baz} />;

  return renderFoo();
}
