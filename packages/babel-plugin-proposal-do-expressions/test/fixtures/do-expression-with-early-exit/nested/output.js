async function p(x) {
  var _do3;
  _do3 = effect(0);
  {
    var _do4;
    if (effect(1)) {
      return x;
    }
    if (effect(2)) {
      var _do;
      _do = effect(10);
      {
        var _do2;
        if (effect(11)) {
          return x;
        }
        if (effect(12)) {
          _do2 = 11;
        }
      }
      const zz = _do + _do2 + effect(13);
      _do4 = zz;
    } else {
      _do4 = 2;
    }
  }
  const y = _do3 + _do4 + effect(3);
  return y;
}
