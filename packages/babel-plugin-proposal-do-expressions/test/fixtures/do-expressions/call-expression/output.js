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
(effects.push(1), object)[effects.push(2), "method"]((effects.push(3), "arg"));
(() => {
  effects.push(5);
  return {
    x: () => effects.push(6)
  };
})().x(effects.push(7));
