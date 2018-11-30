Object.defineProperty(Object.prototype, 'NOSET', {
  set(value) {
    // noop
  },
});

Object.defineProperty(Object.prototype, 'NOWRITE', {
  writable: false,
  value: 'abc',
});

const obj = { NOSET: 123 };
// this wouldn't work as expected if transformed as Object.assign (or equivalent)
// because those trigger object setters (spread don't)
const objSpread = { ...obj };

const obj2 = { NOSET: 123, NOWRITE: 456 };
// this line would throw `TypeError: Cannot assign to read only property 'NOWRITE'`
// if transformed as Object.assign (or equivalent) because those use *assignment* for creating properties
// (spread defines them)
const obj2Spread = { ...obj2 };

expect(objSpread).toEqual(obj);
expect(obj2Spread).toEqual(obj2);

const KEY = Symbol('key');
const obj3Spread = { ...{ get foo () { return 'bar' } }, [KEY]: 'symbol' };
expect(Object.getOwnPropertyDescriptor(obj3Spread, 'foo').value).toBe('bar');
expect(Object.getOwnPropertyDescriptor(obj3Spread, KEY).value).toBe('symbol');

const obj4Spread = { ...Object.prototype };
expect(Object.getOwnPropertyDescriptor(obj4Spread, 'hasOwnProperty')).toBeUndefined();

expect(() => ({ ...null, ...undefined })).not.toThrow();

const o = Object.create(null);
o.a = 'foo';
o.__proto__ = [];
const o2 = { ...o };
expect(Array.isArray(Object.getPrototypeOf(o2))).toBe(false);
