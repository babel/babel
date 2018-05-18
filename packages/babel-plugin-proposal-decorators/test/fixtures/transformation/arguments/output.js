let A = babelHelpers.decorate([dec(a, b, ...c)], function (_initialize) {
  class A {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: A,
    d: [{
      kind: "method",
      decorators: [dec(a, b, ...c)],
      key: "method",

      value() {}

    }]
  };
});
