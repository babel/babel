var _do, _do2, _do6, _do9, _do10, _do11, _do12, _do15, _do18, _do20;
{
  var _do3;
  effects.push(1);
  _do3 = null;
}
if (_do3 != null) {
  {
    var _do4;
    effects.push(2);
    _do4 = 0;
  }
  _do2 = _do3[_do4];
}
if (_do2 != null) {
  {
    var _do5;
    effects.push(3);
    _do5 = 0;
  }
  _do = _do2[_do5];
}
const v1 = _do;
{
  var _do7;
  effects.push(4);
  _do7 = [{
    x: 1
  }];
}
if (_do7 != null) {
  {
    var _do8;
    effects.push(5);
    _do8 = 0;
  }
  _do6 = _do7[_do8];
}
_do9 = _do6?.x;
const v2 = _do9;
{
  var _do0;
  effects.push(6);
  _do0 = [];
}
{
  var _do1;
  effects.push(7);
  _do1 = 0;
}
_do10 = _do0[_do1];
if (_do10 != null) {
  _do11 = _do10();
}
const v3 = _do11;
{
  var _do13;
  effects.push(8);
  _do13 = null;
}
if (_do13 != null) {
  {
    var _do14;
    effects.push(9);
    _do14 = 0;
  }
  _do12 = _do13[_do14];
}
if (_do12 != null) {
  _do15 = _do12(effects.push(10));
}
const v4 = _do15;
{
  var _do17;
  effects.push(11);
  _do17 = {
    s: x => {
      {
        var _do16;
        effects.push(12);
        _do16 = x;
      }
      return _do16;
    }
  };
}
_do18 = _do17.s;
if (_do18 != null) {
  {
    var _do19;
    effects.push(13);
    _do19 = 'a';
  }
  _do20 = Reflect.apply(_do18, _do17, [_do19]);
}
const v5 = _do20;
