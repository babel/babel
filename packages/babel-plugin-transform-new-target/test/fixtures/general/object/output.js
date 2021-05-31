"use strict";

const object = {
  test() {
    void 0;
  },

  test2: function _target() {
    this instanceof _target ? this.constructor : void 0;
  }
};
