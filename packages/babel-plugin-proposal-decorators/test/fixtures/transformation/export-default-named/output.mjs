let Foo = babelHelpers.decorateBase([dec()], function (_initialize) {
  class Foo {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: Foo,
    d: []
  };
}, void 0, [babelHelpers.decoratorsNov2018]);
export { Foo as default };
