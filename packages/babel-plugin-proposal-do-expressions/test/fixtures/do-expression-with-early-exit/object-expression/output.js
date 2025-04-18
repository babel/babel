function f(x) {
  var _do, _do2, _do3, _do4;
  _do = effects.push(1);
  _do2 = effects.push(2);
  _do3 = effects.push(3);
  {
    if (effects.push(4), x) return 'x';
  }
  _do4 = {
    [_do]: _do2,
    [_do3]: void 0,
    [effects.push(5)]: effects.push(6)
  };
  const obj = _do4;
  return Object.keys(obj).length;
}
