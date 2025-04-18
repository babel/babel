function f1(a) {
  var _do2;
  {
    var _do;
    if (effects.push(1), a) return 0;
    _do = arg => effects.push(arg);
  }
  {
    var _do3;
    if (effects.push(2), false) return 1;
    _do3 = 'arg';
  }
  _do2 = _do3;
  _do(_do2);
}
function f2(a) {
  var _do5, _do6, _do7, _do9;
  {
    var _do4;
    if (effects.push(1), false) return 0;
    _do4 = {
      key: arg => effects.push(arg)
    };
  }
  _do7 = _do4;
  {
    var _do8;
    if (effects.push(2), a) return 1;
    _do8 = 'key';
  }
  _do9 = _do7[_do8];
  _do5 = _do9;
  {
    var _do0;
    if (effects.push(3), false) return 2;
    _do0 = 'arg';
  }
  _do6 = _do0;
  _do5.call(_do4, _do6);
}
