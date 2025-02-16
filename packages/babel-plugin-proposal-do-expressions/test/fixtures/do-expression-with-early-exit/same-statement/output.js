function main(a, b) {
  var _do;
  _do = effect(0);
  {
    var _do2;
    if (effect(1)) return 0;
    _do2 = a;
  }
  {
    var _do3;
    if (effect(2)) return 1;
    _do3 = 'arg';
  }
  return _do + _do2 + _do3 + effect(3);
}
