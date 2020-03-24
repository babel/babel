"use strict";

const foo = {
  bar: function () {
    console.log('hello');
  }
};
(foo === null || foo === void 0 ? foo.bar.bind(foo) : foo.bar)();
