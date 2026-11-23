define(["foo"], function (_foo) {
  "use strict";

  for (let _i = 0, _array = _foo.array; _i < _array.length; _i++) {
    const elm = _array[_i];
    console.log(elm);
  }
});
