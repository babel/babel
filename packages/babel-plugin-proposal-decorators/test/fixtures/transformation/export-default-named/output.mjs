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
}, babelHelpers.privateNameUtils());
export { Foo as default };
