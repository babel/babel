const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {}
const returnsGetSet = () => ({ set(v) {}, get() {} });

expect(() => class { @returnsNull accessor a }).toThrow("accessor decorators must return an object with get, set, or initializer properties or void 0")
expect(() => class { @returnsFalse accessor a }).toThrow("accessor decorators must return an object with get, set, or initializer properties or void 0")
expect(() => class { @returnsFunction accessor a }).toThrow("accessor decorators must return an object with get, set, or initializer properties or void 0")
expect(() => class { @returnsGetSet accessor a }).not.toThrow();
expect(() => class { @returnsUndefined accessor a }).not.toThrow();
