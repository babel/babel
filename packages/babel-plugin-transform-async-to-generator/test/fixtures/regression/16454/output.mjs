export function a() {
  return _a.apply(this, arguments);
}
function _a() {
  _a = babelHelpers.asyncToGenerator(function* () {
    yield work();
  });
  return _a.apply(this, arguments);
}
/**
 * Documentation for function b.
 */
export function b() {
  return 42;
}
