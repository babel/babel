const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {};

expect(() => class { @returnsNull p }).toThrow("field decorators must return a function or undefined")
expect(() => class { @returnsFalse p }).toThrow("field decorators must return a function or undefined")
expect(() => class { @returnsFunction p }).not.toThrow();
expect(() => class { @returnsUndefined p }).not.toThrow();
