function f(x, y, z) {
  var _do3;
  _do3 = effects.push(0);
  {
    var _do4;
    if (effects.push(1), x) {
      return 'x';
    }
    if (effects.push(2), y) {
      var _do;
      _do = effects.push(10);
      {
        var _do2;
        if (effects.push(11), z) {
          return 'z';
        }
        _do2 = 20;
      }
      const t = (_do, 10) + _do2 + (effects.push(12), 30);
      _do4 = t;
    } else {
      _do4 = 30;
    }
  }
  const t = (_do3, 1) + _do4 + (effects.push(3), 100);
  return t;
}
