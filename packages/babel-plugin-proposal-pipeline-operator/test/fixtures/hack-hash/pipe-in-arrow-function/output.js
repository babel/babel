const result = () => {
  var _ref;
  return _ref = Math.floor(-2.2 // -2.2
  ) // -3
  , (() => Math.pow(_ref, 5) // () => -243
  )();
}; // -243

expect(result()).toBe(-243);
