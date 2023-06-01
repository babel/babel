var _initClass, _decorated_class, _class;
const expectedValue = 42;
function decorator(target) {
  target.decoratorValue = expectedValue;
}
const result = ((_class = class {
  constructor() {
    this.value = expectedValue;
  }
}, [_decorated_class, _initClass] = babelHelpers.applyDecs2305(_class, [], [decorator]).c, _initClass()), _decorated_class);
expect(result.decoratorValue).toBe(expectedValue);
expect(new result().value).toBe(expectedValue);
