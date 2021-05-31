"use strict";

const object = {
  test() {
    new.target;
  },

  test2: function() {
    new.target;
  },
}
