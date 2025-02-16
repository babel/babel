async function p(x) {
  var _temp3;
  _temp3 = effect(0);
  {
    var _temp4;
    if (effect(1)) {
      return x;
    }
    if (effect(2)) {
      var _temp;
      _temp = effect(10);
      {
        var _temp2;
        if (effect(11)) {
          return x;
        }
        if (effect(12)) {
          _temp2 = 11;
        }
      }
      const zz = _temp + _temp2 + effect(13);
      _temp4 = zz;
    } else {
      _temp4 = 2;
    }
  }
  const y = _temp3 + _temp4 + effect(3);
  return y;
}
