var _do2, _do4, _do6, _do7;
const effects = [];
const object = {
  value: 'this',
  get method() {
    effects.push(4);
    return function (arg) {
      effects.push(this.value);
      effects.push(arg);
    };
  }
};
{
  var _do;
  effects.push(1);
  _do = object;
}
_do2 = _do;
{
  var _do3;
  effects.push(2);
  _do3 = "method";
}
_do4 = _do2[_do3];
{
  var _do5;
  effects.push(3);
  _do5 = "arg";
}
Reflect.apply(_do4, _do2, [_do5]);
_do6 = (() => {
  effects.push(5);
  return {
    x: () => effects.push(6)
  };
})();
_do7 = _do6.x;
{
  var _do8;
  _do8 = effects.push(7);
}
Reflect.apply(_do7, _do6, [_do8]);
