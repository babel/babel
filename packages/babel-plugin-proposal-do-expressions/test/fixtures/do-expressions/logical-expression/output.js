{
  var _do;
  effects.push(1);
  _do = 1;
}
if (_do) {
  {
    var _do2;
    effects.push(2);
    _do2 = 2;
  }
}
if (_do && _do2) {
  {
    var _do3;
    effects.push(3);
    _do3 = 3;
  }
}
const v1 = _do && _do2 && _do3;
{
  var _do4;
  effects.push(4);
  _do4 = 1;
}
if (_do4) {
  {
    var _do5;
    effects.push(5);
    _do5 = 0;
  }
}
if (_do4 && _do5) {
  {
    var _do6;
    _do6 = effects.push(6);
  }
}
const v2 = _do4 && _do5 && _do6;
{
  var _do7;
  effects.push(7);
  _do7 = 1;
}
if (!_do7) {
  {
    var _do8;
    effects.push(8);
    _do8 = 2;
  }
}
const v3 = _do7 || _do8;
{
  var _do9;
  effects.push(9);
  _do9 = null;
}
if (_do9 == null) {
  {
    var _do0;
    effects.push(10);
    _do0 = 1;
  }
}
const v4 = _do9 ?? _do0;
