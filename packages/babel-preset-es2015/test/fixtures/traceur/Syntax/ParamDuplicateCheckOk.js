function f(x, y = function(x) {}) {
  'use strict';
}

var f2 = (x, y = function(x) {}) => {
  'use strict';
};

function g() {
  'use strict';
  function h(x, y = function(x) {}) {

  }

  var h2 = (x, y = function(x) {}) => {

  };
}
