function f(x) {
  var _do, _do2, _do3;
  _do = effects.push(1);
  _do2 = effects.push(2);
  _do3 = effects.push(3);
  {
    var _do4;
    if (effects.push(4), x) return 'x';
  }
  const obj = {
    [_do]: _do2,
    [_do3]: _do4,
    [effects.push(5)]: effects.push(6)
  };
  return Object.keys(obj).length;
}
