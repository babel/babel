var _ref;

const expectedValue = 42;

function decorator(target) {
  target.decoratorValue = expectedValue;
}

const result = (_ref = expectedValue, babelHelpers.decorate([decorator], function (_initialize) {
  "use strict";

  class _class {
    constructor() {
      _initialize(this);

      this.value = _ref;
    }

  }

  return {
    F: _class,
    d: []
  };
}));
expect(result.decoratorValue).toBe(expectedValue);
expect(new result().value).toBe(expectedValue);
