function strictMode() {
  "use strict";

  // https://github.com/compat-table/compat-table/blob/f12538fe11c48c4fd35d6cdc7789653e10871b90/data-es6.js#L14429-L14446
  console.assert(a() === 1);
  function a() {
    return 1;
  }
  console.assert(a() === 1);
  {
    var _a = function () {
      return 2;
    };
    console.assert(_a() === 2);
    console.assert(_a() === 2);
  }
  console.assert(a() === 1);
}
function nonStrictMode() {
  // https://github.com/compat-table/compat-table/blob/f12538fe11c48c4fd35d6cdc7789653e10871b90/data-es6.js#L4269-L4286

  console.assert(typeof a === "undefined");
  {
    var a = function () {
      return 1;
    };
  }
  console.assert(a() === 1);
  console.assert(b() === 2);
  {
    var b = function () {
      return 1;
    };
  }
  function b() {
    return 2;
  }
  console.assert(b() === 1);
  function c() {
    return 1;
  }
  switch (0) {
    case 1:
      var c = function () {
        return 2;
      };
  }
  console.assert(c() === 1);
}
strictMode();
nonStrictMode();
