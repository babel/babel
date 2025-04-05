var _do3;
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
{
  var _do2;
  effects.push(2);
  _do2 = "method";
}
_do3 = _do[_do2];
{
  var _do4;
  effects.push(3);
  _do4 = "arg";
}
Reflect.apply(_do3, _do, [_do4]);
