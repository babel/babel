function* g() {
  let A = babelHelpers.decorate([dec], function (_initialize, _buildPrivateName, _super) {
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
  }, babelHelpers.buildPrivateName, (yield B));
}
