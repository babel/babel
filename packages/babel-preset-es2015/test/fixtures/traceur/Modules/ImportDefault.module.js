import x from './resources/default.js';
expect(x).toBe(42);

import C from './resources/default-class.js';
expect(new C().m()).toBe('m');

import {default as D} from './resources/default-name.js';
expect(D).toBe(4);

import f from './resources/default-function.js';
expect(f()).toBe(123);

import E from './resources/default-class-expression.js';
expect(new E().n()).toBe('n');

import g from './resources/default-function-expression.js';
expect(g()).toBe(456);
