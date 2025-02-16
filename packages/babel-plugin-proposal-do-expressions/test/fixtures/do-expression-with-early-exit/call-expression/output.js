function main() {
  {
    var _do;
    if (effect(1)) return 0;
    _do = fn;
  }
  {
    var _do2;
    if (effect(2)) return 1;
    _do2 = 'arg';
  }
  _do(_do2);
}
function withThis() {
  var _do5;
  {
    var _do3;
    if (this.effect(1)) return 0;
    _do3 = obj;
  }
  {
    var _do4;
    if (this.effect(2)) return 1;
    _do4 = 'key';
  }
  _do5 = _do3[_do4];
  {
    var _do6;
    if (this.effect(3)) return 2;
    _do6 = 'arg';
  }
  _do5(_do6);
}
