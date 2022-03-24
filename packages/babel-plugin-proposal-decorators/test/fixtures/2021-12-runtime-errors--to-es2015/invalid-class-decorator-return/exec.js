const returnsUndefined = () => void 0;
const returnsNull = () => null;
const returnsFalse = () => false;
const returnsFunction = () => () => {};

expect(() => @returnsNull class {}).toThrow("class decorators must return a function or void 0")
expect(() => @returnsFalse class {}).toThrow("class decorators must return a function or void 0")
expect(() => @returnsFunction class {}).not.toThrow();
expect(() => @returnsUndefined class {}).not.toThrow();
