class C {}
/* before get a */
function _get_a() {
  return 42;
}
/* after get a */
/* before set a */
function _set_a(v) {}
var _a = {
  get: _get_a,
  set: _set_a
};
