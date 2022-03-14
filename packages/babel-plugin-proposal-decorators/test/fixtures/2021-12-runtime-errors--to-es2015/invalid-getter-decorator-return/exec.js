const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {};

expect(() => class { @returnsNull get p() {} }).toThrow("method decorators must return a function or void 0")
expect(() => class { @returnsFalse get p() {} }).toThrow("method decorators must return a function or void 0")
expect(() => class { @returnsFunction get p() {} }).not.toThrow();
expect(() => class { @returnsUndefined get p() {} }).not.toThrow();
