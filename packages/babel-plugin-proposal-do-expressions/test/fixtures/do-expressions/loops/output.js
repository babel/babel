{
  {
    var _do3;
    effects.push(1);
    _do3 = 0;
  }
  let i = _do3;
  for (;;) {
    _do = i;
    {
      var _do2;
      effects.push(2);
      _do2 = 3;
    }
    if (!(_do < _do2)) break;
    {
      var _do;
      effects.push(3);
    }
    {
      effects.push(4);
      i++;
    }
  }
}
{
  var _do4;
  effects.push(1);
  _do4 = {
    x: 1,
    y: 2
  };
}
for (let i in _do4) {
  effects.push(i);
}
{
  var _do5;
  effects.push(1);
  _do5 = [2, 3];
}
for (let i of _do5) {
  effects.push(i);
}
let x = 0;
while (true) {
  {
    var _do6;
    effects.push(1);
    _do6 = x < 3;
  }
  if (!_do6) break;
  {
    effects.push(2);
    x++;
  }
}
let y = 0;
do {
  {
    effects.push(1);
    y++;
  }
  {
    var _do7;
    effects.push(2);
    _do7 = y < 3;
  }
  if (!_do7) break;
} while (true);
