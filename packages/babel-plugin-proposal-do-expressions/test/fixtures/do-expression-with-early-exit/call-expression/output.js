function f1(a) {
  {
    var _do;
    if (effects.push(1), a) return 0;
    _do = arg => effects.push(arg);
  }
  {
    var _do2;
    if (effects.push(2), false) return 1;
    _do2 = 'arg';
  }
  _do(_do2);
}
function f2(a) {
  var _do4, _do6;
  ;
  {
    var _do3;
    if (effects.push(1), false) return 0;
    _do3 = {
      key: arg => effects.push(arg)
    };
  }
  _do4 = _do3;
  {
    var _do5;
    if (effects.push(2), a) return 1;
    _do5 = 'key';
  }
  _do6 = _do4[_do5];
  {
    var _do7;
    if (effects.push(3), false) return 2;
    _do7 = 'arg';
  }
  Reflect.apply(_do6, _do4, [_do7]);
}
