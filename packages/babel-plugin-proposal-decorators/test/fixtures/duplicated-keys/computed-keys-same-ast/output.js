let Foo = babelHelpers.decorate([_ => desc = _], function (_initialize) {
  "use strict";

  class Foo {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: Foo,
    d: [{
      kind: "method",
      key: getKey(),

      value() {
        return 1;
      }

    }, {
      kind: "method",
      key: getKey(),

      value() {
        return 2;
      }

    }]
  };
});
