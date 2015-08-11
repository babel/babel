// Error: :6:11: implements is a reserved identifier
// Error: :11:11: yield is a reserved identifier

function f() {
  'use strict';
  return {implements};
}

function g() {
  'use strict';
  return {yield};
}
