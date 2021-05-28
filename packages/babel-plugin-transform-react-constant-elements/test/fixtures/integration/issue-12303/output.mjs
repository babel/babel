const _exclude = ["outsetArrows"];

function Foo(_ref) {
  var _div;

  let {
    outsetArrows
  } = _ref,
      rest = babelHelpers.objectWithoutProperties(_ref, _exclude);
  return useMemo(() => _div || (_div = <div outsetArrows={outsetArrows} />), [outsetArrows]);
}
