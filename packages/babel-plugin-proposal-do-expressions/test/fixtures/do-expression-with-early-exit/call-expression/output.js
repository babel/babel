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
  var _do5;
  ;
  {
    var _do3;
    if (effects.push(1), false) return 0;
    _do3 = {
      key: arg => effects.push(arg)
    };
  }
  {
    var _do4;
    if (effects.push(2), a) return 1;
    _do4 = 'key';
  }
  _do5 = _do3[_do4];
  {
    var _do6;
    if (effects.push(3), false) return 2;
    _do6 = 'arg';
  }
  Reflect.apply(_do5, _do3, [_do6]);
}
