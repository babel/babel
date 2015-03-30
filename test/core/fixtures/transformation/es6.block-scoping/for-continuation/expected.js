"use strict";

for (var i = 0; i < 2; i++) {
  (function (_i) {
    (function () {
      _i;
    });
    console.log(_i);
    _i += 1;
    i = _i;
  })(i);
}
