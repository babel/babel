const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {};

expect(() => class { @returnsNull m() {} }).toThrow("method decorators must return a function or void 0")
expect(() => class { @returnsFalse m() {} }).toThrow("method decorators must return a function or void 0")
expect(() => class { @returnsFunction m() {} }).not.toThrow();
expect(() => class { @returnsUndefined m() {} }).not.toThrow();
