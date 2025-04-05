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

(do {
  effects.push(1);
  object
})[do { 
  effects.push(2);
  "method"
}](do {
  effects.push(3);
  "arg"
});

expect(effects).toEqual([1, 2, 4, 3, 'this', 'arg']);