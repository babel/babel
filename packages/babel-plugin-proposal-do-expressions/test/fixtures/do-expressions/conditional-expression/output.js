{
  var _do;
  effects.push(1);
  _do = true;
}
if (_do) {
  {
    var _do2;
    effects.push(2);
    _do2 = 2;
  }
} else {
  {
    var _do3;
    effects.push(3);
    _do3 = 3;
  }
}
const v1 = _do ? _do2 : _do3;
{
  var _do4;
  effects.push(4);
  _do4 = false;
}
if (_do4) {
  {
    var _do5;
    effects.push(5);
    _do5 = 2;
  }
} else {
  {
    var _do6;
    effects.push(6);
    _do6 = 3;
  }
}
const v2 = _do4 ? _do5 : _do6;
