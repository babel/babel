"use strict";

module.exports = exports = Object.create(null, {
  __esModule: {
    value: true
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  value: {
    default: function () {}
  }.default
});
var unrelated = undefined;
Object.defineProperty(exports, "unrelated", {
  enumerable: true,

  get() {
    return unrelated;
  }

});
unrelated = "changed";
Object.freeze(exports);