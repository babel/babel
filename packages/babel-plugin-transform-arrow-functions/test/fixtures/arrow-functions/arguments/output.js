var _arguments4 = arguments;

function one() {
  var _arguments2 = arguments;

  var inner = function () {
    return _arguments2;
  };

  return [].slice.call(inner());
}

one(1, 2);

function two() {
  var inner = function () {
    return _arguments;
  };

  var another = function () {
    var inner2 = function () {
      return _arguments;
    };
  };

  return [].slice.call(inner());
}

two(1, 2);

function three() {
  var fn = function () {
    return _arguments[0] + "bar";
  };

  return fn();
}

three("foo");

function four() {
  var fn = function () {
    return _arguments[0].foo + "bar";
  };

  return fn();
}

four({
  foo: "foo"
});

function five(obj) {
  var fn = function () {
    return obj.arguments[0].foo + "bar";
  };

  return fn();
}

five({
  arguments: ["foo"]
});

function six(obj) {
  var fn = function () {
    var fn2 = function () {
      return _arguments[0];
    };

    return fn2("foobar");
  };

  return fn();
}

six();

var seven = function () {
  var arguments = 1;
  return arguments;
};

seven();

var eight = function () {
  var _arguments3 = 1;
  return function () {
    return _arguments4;
  };
};

eight();

function nine() {
  var _arguments6 = arguments;
  var _arguments5 = 1;

  var foo = function () {
    return _arguments6;
  };
}

nine();
var _arguments = 1;

function ten() {
  var foo = function () {
    return _arguments;
  };
}

ten();

var eleven = function () {
  var _arguments7 = 2;
  return function () {
    var _arguments8 = arguments;
    return function () {
      return _arguments8;
    };
  };
};

eleven()(1, 2, 3)();

var twelve = function () {
  var _arguments9 = 2;
  return class {
    m() {
      var _arguments10 = arguments;
      return function () {
        return _arguments10;
      };
    }

  };
};

twelve();
