define(["foo"], function (_foo) {
  "use strict";

  for (let _i = 0; _i < _foo.array.length; _i++) {
    const elm = _foo.array[_i];
    console.log(elm);
  }
});
