() => {
  "use strict";

  let Foo = babelHelpers.decorate([dec], function (_initialize) {
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

        value() {}

      }]
    };
  });
};

() => {
  let Foo = babelHelpers.decorate([dec], function (_initialize2) {
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

        value() {}

      }]
    };
  });
};
