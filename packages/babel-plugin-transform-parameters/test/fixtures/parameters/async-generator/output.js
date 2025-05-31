function f(_ref) {
  let [] = _ref;
  return async function* () {}();
}
;
expect(() => {
  f();
}).toThrow(TypeError);
