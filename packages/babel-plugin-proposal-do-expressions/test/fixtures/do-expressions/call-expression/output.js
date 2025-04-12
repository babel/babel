var _do2, _do3, _do4, _do5, _do7, _do9;
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
_do7 = _do;
{
  var _do8;
  effects.push(2);
  _do8 = "method";
}
_do9 = _do7[_do8];
_do2 = _do9;
{
  var _do0;
  effects.push(3);
  _do0 = "arg";
}
_do3 = _do0;
Reflect.apply(_do2, _do, [_do3]);
_do4 = (() => {
  effects.push(5);
  return {
    x: () => effects.push(6)
  };
})();
_do5 = _do4.x;
{
  var _do6;
  _do6 = effects.push(7);
}
Reflect.apply(_do5, _do4, [_do6]);
