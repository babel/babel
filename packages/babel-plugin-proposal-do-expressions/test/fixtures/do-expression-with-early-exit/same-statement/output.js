function f(x, y) {
  var _do, _do3, _do4;
  _do = effects.push(0);
  {
    var _do2;
    if (effects.push(1), x) return 'x';
    _do2 = 'b';
  }
  _do3 = _do;
  _do4 = _do2;
  {
    var _do5;
    if (effects.push(2), y) return 'y';
    _do5 = 'c';
  }
  return (_do3, 'a') + _do4 + _do5 + (effects.push(3), 'd');
}
