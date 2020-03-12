async function g() {
  let A = babelHelpers.decorate([dec], function (_initialize, _super) {
    "use strict";

    class A extends _super {
      constructor(...args) {
        try {
          super(...args);
        } finally {
          _initialize(this);
        }
      }

    }

    return {
      F: A,
      d: []
    };
  }, (await B));
}
