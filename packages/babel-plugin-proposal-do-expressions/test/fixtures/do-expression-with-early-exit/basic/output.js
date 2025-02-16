async function p(x) {
  _temp3 = effect(0);
  {
    var _temp4;
    if (effect(1)) {
      return x;
    }
    if (effect(2)) {
      _temp = effect(10);
      {
        var _temp2;
        if (effect(11)) {
          return x;
        }
        if (effect(12)) {
          _temp2 = 11;
        } else _temp2 = void 0;
      }
      const zz = _temp + _temp2 + effect(13);
      _temp4 = zz;
    } else {
      _temp4 = 2;
    }
  }
  const y = _temp3 + _temp4 + effect(3);
  _temp5 = effect(1);
  _temp6 = effect(2);
  _temp7 = effect(3);
  {
    var _temp8;
    if (effect(4)) return 0;else _temp8 = void 0;
  }
  const obj = {
    [_temp5]: _temp6,
    [_temp7]: _temp8,
    [effect(5)]: effect(6)
  };
  return y;
}
