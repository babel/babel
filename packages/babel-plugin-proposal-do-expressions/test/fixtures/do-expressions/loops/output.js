{
  {
    var _do2;
    effects.push(1);
    _do2 = 0;
  }
  let i = _do2;
  for (;;) {
    {
      var _do;
      effects.push(2);
      _do = 3;
    }
    if (!(i < _do)) break;
    {
      effects.push(3);
    }
    {
      effects.push(4);
      i++;
    }
  }
}
{
  var _do3;
  effects.push(1);
  _do3 = {
    x: 1,
    y: 2
  };
}
for (let i in _do3) {
  effects.push(i);
}
{
  var _do4;
  effects.push(1);
  _do4 = [2, 3];
}
for (let i of _do4) {
  effects.push(i);
}
let x = 0;
while (true) {
  {
    var _do5;
    effects.push(1);
    _do5 = x < 3;
  }
  if (!_do5) break;
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
    var _do6;
    effects.push(2);
    _do6 = y < 3;
  }
  if (!_do6) break;
} while (true);
