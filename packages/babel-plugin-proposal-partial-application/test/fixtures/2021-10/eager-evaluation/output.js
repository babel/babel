((_getF, _getX, _ref) => function (_argPlaceholder) {
  return _getF(_getX, _argPlaceholder, ..._ref);
})(getF(), getX(), [...getRest()]);
async function f() {
  return ((_g, _await$x) => function (_argPlaceholder2) {
    return _g(_await$x, _argPlaceholder2);
  })(g, await x);
}
