import * as a from './resources/i.js';

(function() {
  'use strict';
  assert.equal(0, a.i);
  a.inc();
  assert.equal(1, a.i);

  assert.throws(function() {
    a.i = 2;
  }, TypeError);
})();

assert.equal(1, a.i);

import * as d from './resources/d.js';
assert.equal('A', d.a);
