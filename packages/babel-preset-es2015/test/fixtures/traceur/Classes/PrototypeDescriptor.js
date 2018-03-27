class C {}

var descr = Object.getOwnPropertyDescriptor(C, 'prototype');
expect(descr.enumerable).toBe(false);
expect(descr.configurable).toBe(false);
expect(descr.writable).toBe(false);
expect(descr.value).toBe(C.prototype);
