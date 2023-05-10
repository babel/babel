const createClass = (k) => class { [k()] = 2 };

const clazz = createClass(() => 'foo');
const instance = new clazz();
expect(instance.foo).toBe(2);