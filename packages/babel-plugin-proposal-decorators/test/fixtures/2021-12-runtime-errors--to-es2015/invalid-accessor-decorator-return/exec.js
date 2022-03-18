const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {}
const returnsGetSet = () => ({ set(v) {}, get() {} });
const returnsInit = () => ({ init() {} });
const returnsGetFalse = () => ({ get: false });
const returnsSetFalse = () => ({ set: false });
const returnsInitFalse = () => ({ init: false });

expect(() => class { @returnsNull accessor a }).toThrow("accessor decorators must return an object with get, set, or init properties or void 0")
expect(() => class { @returnsFalse accessor a }).toThrow("accessor decorators must return an object with get, set, or init properties or void 0")
expect(() => class { @returnsFunction accessor a }).toThrow("accessor decorators must return an object with get, set, or init properties or void 0")
expect(() => class { @returnsGetFalse accessor a }).toThrow("accessor.get must be a function");
expect(() => class { @returnsSetFalse accessor a }).toThrow("accessor.set must be a function");
expect(() => class { @returnsInitFalse accessor a }).toThrow("accessor.init must be a function");

expect(() => class { @returnsGetSet accessor a }).not.toThrow();
expect(() => class { @returnsInit accessor a }).not.toThrow();
expect(() => class { @returnsUndefined accessor a }).not.toThrow();
