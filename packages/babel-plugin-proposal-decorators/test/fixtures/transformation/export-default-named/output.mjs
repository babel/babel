let Foo = babelHelpers.decorate([dec()], function (_initialize) {
  class Foo {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: Foo,
    d: []
  };
}, void 0, [babelHelpers.privateName()]);
export { Foo as default };
