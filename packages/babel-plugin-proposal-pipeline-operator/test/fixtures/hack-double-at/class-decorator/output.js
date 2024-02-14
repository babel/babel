var _initClass, _decorated_class, _Class;
const expectedValue = 42;
function decorator(target) {
  target.decoratorValue = expectedValue;
}
const result = ((_Class = class {
  constructor() {
    this.value = expectedValue;
  }
}, [_decorated_class, _initClass] = babelHelpers.applyDecs2311(_Class, [decorator], []).c, _initClass()), _decorated_class);
expect(result.decoratorValue).toBe(expectedValue);
expect(new result().value).toBe(expectedValue);
