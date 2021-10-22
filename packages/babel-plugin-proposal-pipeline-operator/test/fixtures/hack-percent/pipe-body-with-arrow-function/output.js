var _ref, _ref2, _ref3;

const result = (_ref3 = -2.2 // -2.2
, (_ref2 = Math.floor(_ref3) // -3
, (_ref = () => Math.pow(_ref2, 5) // () => -243
, _ref()))); // -243

expect(result).toBe(-243);
