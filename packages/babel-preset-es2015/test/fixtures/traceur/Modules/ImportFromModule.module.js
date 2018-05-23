import {a as renamedX, b} from './resources/m.js';
import {a} from './resources/m.js';
import * as m2 from './resources/m.js';

expect(a).toBe(1);
expect(renamedX).toBe(1);
expect(b).toBe(2);

import * as m from './resources/m.js';

expect(renamedX).toBe(a);
expect(m.a).toBe(a);

import * as m3 from './resources/m.js';

expect(m3).toBe(m);
expect(m.b).toBe(b);
