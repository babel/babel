"use strict";

var Utils = {
  get: function get() {}
};

var _get = Utils.get;

var bar = {
  get: function get(arg) {
    _get(arg, "baz");
  }
};
