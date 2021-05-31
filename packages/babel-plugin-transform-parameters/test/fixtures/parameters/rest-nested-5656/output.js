function a() {
  var foo = function () {
    return bar.apply(void 0, arguments);
  };

  foo.apply(void 0, arguments);
}

function b() {
  var foo = function () {
    return bar.apply(void 0, arguments);
  };

  foo.apply(void 0, arguments);
}

function c() {
  var foo = function () {
    return bar.apply(void 0, arguments);
  };

  foo([]);
}

function d(thing) {
  var foo = function () {
    return bar.apply(void 0, arguments);
  };

  {
    var args = thing;
    foo(thing);
  }
}
