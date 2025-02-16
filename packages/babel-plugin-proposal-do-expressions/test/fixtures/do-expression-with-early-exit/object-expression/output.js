function main() {
  var _temp, _temp2, _temp3;
  _temp = effect(1);
  _temp2 = effect(2);
  _temp3 = effect(3);
  {
    var _temp4;
    if (effect(4)) return 0;
  }
  const obj = {
    [_temp]: _temp2,
    [_temp3]: _temp4,
    [effect(5)]: effect(6)
  };
}
