function _tryCatch(t, r, e) {
  try {
    return {
      e: 0,
      v: t.call(r, e)
    };
  } catch (t) {
    return {
      e: 1,
      v: t
    };
  }
}
export { _tryCatch as default };