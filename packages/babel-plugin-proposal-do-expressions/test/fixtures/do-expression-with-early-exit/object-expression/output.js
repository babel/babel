function main() {
  var _do, _do2, _do3;
  _do = effect(1);
  _do2 = effect(2);
  _do3 = effect(3);
  {
    var _do4;
    if (effect(4)) return 0;
  }
  const obj = {
    [_do]: _do2,
    [_do3]: _do4,
    [effect(5)]: effect(6)
  };
}
