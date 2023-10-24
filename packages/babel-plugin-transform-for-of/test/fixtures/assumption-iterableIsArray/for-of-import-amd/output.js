define(["foo"], function (_foo) {
  "use strict";

  for (let _i = 0, _arr = _foo.array; _i < _arr.length; _i++) {
    const elm = _arr[_i];
    console.log(elm);
  }
});
