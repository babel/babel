const expectedValue = 42;

function decorator(target) {
  target.decoratorValue = expectedValue;
}

const result = babelHelpers.decorate([decorator], function (_initialize) {
  "use strict";

  class _class {
    constructor() {
      _initialize(this);

      this.value = expectedValue;
    }

  }

  return {
    F: _class,
    d: []
  };
});
expect(result.decoratorValue).toBe(expectedValue);
expect(new result().value).toBe(expectedValue);
