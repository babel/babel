var _ref;
function area(rect) {
  return rect.width * rect.height;
}
const result = (_ref = Math.abs(-5), area({
  width: _ref,
  height: _ref + 3
}));
expect(result).toBe(40);
