() => {
  "use strict";

  let Foo = babelHelpers.decorateBase([dec], function (_initialize) {
    class Foo {
      constructor() {
        _initialize(this);
      }

    }

    return {
      F: Foo,
      d: [{
        kind: "method",
        key: "method",
        value: function method() {}
      }]
    };
  }, void 0, [babelHelpers.decoratorsNov2018]);
};

() => {
  let Foo = babelHelpers.decorateBase([dec], function (_initialize2) {
    "use strict";

    class Foo {
      constructor() {
        _initialize2(this);
      }

    }

    return {
      F: Foo,
      d: [{
        kind: "method",
        key: "method",
        value: function method() {}
      }]
    };
  }, void 0, [babelHelpers.decoratorsNov2018]);
};
