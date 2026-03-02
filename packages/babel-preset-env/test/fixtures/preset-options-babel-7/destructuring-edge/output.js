((a, _ref) => {
  let {
    b = 0,
    c = 3
  } = _ref;
  return a === 1 && b === 2 && c === 3;
})(1, {
  b: 2
});
