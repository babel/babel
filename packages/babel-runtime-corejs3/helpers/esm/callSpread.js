function _callSpread(l, a, n) {
  return function () {}.apply.call(l, a, n);
}
export { _callSpread as default };