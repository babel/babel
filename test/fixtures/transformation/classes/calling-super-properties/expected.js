"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  child.__proto__ = parent;
};


var Test = function(Foo) {
  var Test = function Test() {
    Foo.prototype.test.whatever();
    Foo.prototype.test.call(this);
  };

  _extends(Test, Foo);

  Object.defineProperties(Test, {
    test: {
      writable: true,

      value: function() {
        return Foo.wow.call(this);
      }
    }
  });

  return Test;
}(Foo);
