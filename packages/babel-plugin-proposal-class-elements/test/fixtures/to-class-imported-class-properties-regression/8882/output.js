const classes = [];

for (let i = 0; i <= 10; ++i) {
  var _A;

  let _i;

  var _bar = /*#__PURE__*/new WeakMap();

  classes.push((_i = i, _A = class A {
    constructor() {
      babelHelpers.defineProperty(this, _i, `computed field ${i}`);

      _bar.set(this, `private field ${i}`);
    }

    getBar() {
      return babelHelpers.classPrivateFieldGet2(this, _bar);
    }

  }, babelHelpers.defineProperty(_A, "foo", `static field ${i}`), _A));
}
