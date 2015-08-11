import {a as renamedX, b} from './resources/m.js';
import {a} from './resources/m.js';
import * as m2 from './resources/m.js';

assert.equal(1, a);
assert.equal(1, renamedX);
assert.equal(2, b);

import * as m from './resources/m.js';

assert.equal(a, renamedX);
assert.equal(a, m.a);

import * as m3 from './resources/m.js';

assert.isTrue(m === m3);
assert.equal(b, m.b);
