"use strict"

const foo = {
  bar() {
    return this
  }
};

(foo?.bar)();
