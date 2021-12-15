var _bar;

var x = function () {
  _bar = "foo";
  if (!_bar) throw new Error("unreachable");
  return _bar;
}();
