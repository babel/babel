var global = this;

import * as m from './resources/f.js';
expect(m.f()).toBe(global);
