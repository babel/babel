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
      key: getKeyI(),

      value() {
        return 1;
      }

    }, {
      kind: "method",
      key: getKeyJ(),

      value() {
        return 2;
      }

    }]
  };
});
