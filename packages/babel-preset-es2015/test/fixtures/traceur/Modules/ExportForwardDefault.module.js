// Options: --export-from-extended

import {a, b, default as C} from './resources/export-forward-default-as.js';

expect(a).toBe(42);
expect(b()).toBe(123);
expect(new C().m()).toBe('m');
