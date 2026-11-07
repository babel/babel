const _excluded = ["message", "code"];
try {} catch (_ref) {
  let message = _ref.message,
    _ref$code = _ref.code,
    code = _ref$code === void 0 ? 0 : _ref$code,
    details = babelHelpers.objectWithoutProperties(_ref, _excluded);
}
