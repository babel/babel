const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {}
const returnsGetSet = () => ({ set(v) {}, get() {} });
const returnsInitialize = () => ({ initialize() {} });
const returnsGetFalse = () => ({ get: false });
const returnsSetFalse = () => ({ set: false });
const returnsInitializeFalse = () => ({ initialize: false });

expect(() => class { @returnsNull accessor a }).toThrow("accessor decorators must return an object with get, set, or initializer properties or void 0")
expect(() => class { @returnsFalse accessor a }).toThrow("accessor decorators must return an object with get, set, or initializer properties or void 0")
expect(() => class { @returnsFunction accessor a }).toThrow("accessor decorators must return an object with get, set, or initializer properties or void 0")
expect(() => class { @returnsGetFalse accessor a }).toThrow("accessor.get must be a function");
expect(() => class { @returnsSetFalse accessor a }).toThrow("accessor.set must be a function");
expect(() => class { @returnsInitializeFalse accessor a }).toThrow("accessor.initialize must be a function");

expect(() => class { @returnsGetSet accessor a }).not.toThrow();
expect(() => class { @returnsInitialize accessor a }).not.toThrow();
expect(() => class { @returnsUndefined accessor a }).not.toThrow();
