var _ref, _ref2, _ref3;

function area(rect) {
  return rect.width * rect.height;
}

const result = (_ref3 = -5, (_ref2 = Math.abs(_ref3), (_ref = {
  width: _ref2,
  height: _ref2 + 3
}, area(_ref))));
expect(result).toBe(40);
