function* g() {
  let A = babelHelpers.decorateBase([dec], function (_initialize, _super) {
    "use strict";

    class A extends _super {
      constructor(...args) {
        super(...args);

        _initialize(this);
      }

    }

    return {
      F: A,
      d: []
    };
  }, (yield B), [babelHelpers.decoratorsNov2018]);
}
