import x from './resources/default.js';
assert.equal(x, 42);

import C from './resources/default-class.js';
assert.equal(new C().m(), 'm');

import {default as D} from './resources/default-name.js';
assert.equal(D, 4);

import f from './resources/default-function.js';
assert.equal(f(), 123);

import E from './resources/default-class-expression.js';
assert.equal(new E().n(), 'n');

import g from './resources/default-function-expression.js';
assert.equal(g(), 456);
