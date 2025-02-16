function main(a, b) {
  var _temp;
  _temp = effect(0);
  {
    var _temp2;
    if (effect(1)) return 0;
    _temp2 = a;
  }
  {
    var _temp3;
    if (effect(2)) return 1;
    _temp3 = 'arg';
  }
  return _temp + _temp2 + _temp3 + effect(3);
}
