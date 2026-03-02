"use strict";
Object.defineProperty(Object.prototype, 'NOSET', {
  get(value) {
    // noop
  },
});

Object.defineProperty(Object.prototype, 'NOWRITE', {
  writable: false,
  value: 'abc',
});

const obj = { 'NOSET': 123 };
// this won't work as expected if transformed as Object.assign (or equivalent)
// because those trigger object setters (spread don't)
expect(() => {
  const objSpread = { ...obj };
}).toThrow();

const obj2 = { 'NOWRITE': 456 };
// this throws `TypeError: Cannot assign to read only property 'NOWRITE'`
// if transformed as Object.assign (or equivalent) because those use *assignment* for creating properties
// (spread defines them)
expect(() => {
  const obj2Spread = { ...obj2 };
}).toThrow();

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
// Loose will do o2.__proto__ = []
expect(Array.isArray(Object.getPrototypeOf(o2))).toBe(true);
