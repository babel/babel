import * as a from './resources/i.js';

(function() {
  'use strict';
  expect(a.i).toBe(0);
  a.inc();
  expect(a.i).toBe(1);

  expect(function() {
    a.i = 2;
  }).toThrow(TypeError);
})();

expect(a.i).toBe(1);

import * as d from './resources/d.js';
expect(d.a).toBe('A');
