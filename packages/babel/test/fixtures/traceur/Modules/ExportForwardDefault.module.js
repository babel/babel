// Options: --export-from-extended

import {a, b, default as C} from './resources/export-forward-default-as.js';

assert.equal(42, a);
assert.equal(123, b());
assert.equal('m', new C().m());
