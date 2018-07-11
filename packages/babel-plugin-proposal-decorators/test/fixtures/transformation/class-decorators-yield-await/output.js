async function* f() {
  let A = babelHelpers.decorate([yield dec1, await dec2], function (_initialize) {
    "use strict";

    class A {
      constructor() {
        _initialize(this);
      }

    }

    return {
      F: A,
      d: []
    };
  }, babelHelpers.buildPrivateName);
}
