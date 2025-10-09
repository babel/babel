{
  var _do;
  try {
    _do = a();
  } catch (e) {
    _do = b();
  } finally {
    c();
  }
}
var x = _do;
