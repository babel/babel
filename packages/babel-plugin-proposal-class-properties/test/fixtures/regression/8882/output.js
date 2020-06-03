const classes = [];

for (let i = 0; i <= 10; ++i) {
  var _class, _bar, _temp;

  let _i;

  classes.push((_temp = (_bar = new WeakMap(), _i = i, _class = class A {
    constructor() {
      babelHelpers.defineProperty(this, _i, `computed field ${i}`);

      _bar.set(this, {
        writable: true,
        value: `private field ${i}`
      });
    }

    getBar() {
      return babelHelpers.classPrivateFieldGet(this, _bar);
    }

  }), babelHelpers.defineProperty(_class, "foo", `static field ${i}`), _temp));
}
