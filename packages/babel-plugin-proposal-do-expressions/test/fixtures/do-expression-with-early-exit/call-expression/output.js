function main() {
  {
    var _temp;
    if (effect(1)) return 0;
    _temp = fn;
  }
  {
    var _temp2;
    if (effect(2)) return 1;
    _temp2 = 'arg';
  }
  _temp(_temp2);
}
function withThis() {
  var _temp5;
  {
    var _temp3;
    if (this.effect(1)) return 0;
    _temp3 = obj;
  }
  {
    var _temp4;
    if (this.effect(2)) return 1;
    _temp4 = 'key';
  }
  _temp5 = _temp3[_temp4];
  {
    var _temp6;
    if (this.effect(3)) return 2;
    _temp6 = 'arg';
  }
  _temp5(_temp6);
}
