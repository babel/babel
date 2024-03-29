const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {};

expect(() => class { @returnsNull set p(v) {} }).toThrow("method decorators must return a function or undefined")
expect(() => class { @returnsFalse set p(v) {} }).toThrow("method decorators must return a function or undefined")
expect(() => class { @returnsFunction set p(v) {} }).not.toThrow();
expect(() => class { @returnsUndefined set p(v) {} }).not.toThrow();
