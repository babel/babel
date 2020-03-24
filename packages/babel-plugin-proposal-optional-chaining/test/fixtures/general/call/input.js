"use strict"

const foo = {
  bar: function() {
    console.log('hello');
  }
};

(foo?.bar)();
