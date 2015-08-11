// Error: :10:18: Duplicate parameter name x
// Error: :10:24: Duplicate parameter name x
// Error: :14:17: Duplicate parameter name x
// Error: :14:23: Duplicate parameter name x
// Error: :20:20: Duplicate parameter name a
// Error: :20:23: Duplicate parameter name a
// Error: :24:19: Duplicate parameter name a
// Error: :24:22: Duplicate parameter name a

function f(x, y, x, z, x) {
  'use strict';
}

var f2 = (x, y, x, z, x) => {
  'use strict';
};

function g() {
  'use strict';
  function h(a, b, a, a) {

  }

  var g2 = (a, b, a, a) => {

  };
}
