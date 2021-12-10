function one() {
  var _arguments = arguments;

  var inner = function () {
    return _arguments;
  };

  return [].slice.call(inner());
}

one(1, 2);

function two() {
  var _arguments2 = arguments;

  var inner = function () {
    return _arguments2;
  };

  var another = function () {
    var _arguments3 = arguments;

    var inner2 = function () {
      return _arguments3;
    };
  };

  return [].slice.call(inner());
}

two(1, 2);

function three() {
  var _arguments4 = arguments;

  var fn = function () {
    return _arguments4[0] + "bar";
  };

  return fn();
}

three("foo");

function four() {
  var _arguments5 = arguments;

  var fn = function () {
    return _arguments5[0].foo + "bar";
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
      return arguments[0];
    };

    return fn2("foobar");
  };

  return fn();
}

six();

var seven = function () {
  var _arguments6 = 1;
  return _arguments6;
};

seven();

var eight = function () {
  var _arguments7 = 1;
  return function () {
    return _arguments7;
  };
};

eight();

function nine() {
  var arguments = 1;

  var foo = function () {
    return arguments;
  };
}

nine();

var eleven = function () {
  var arguments = 2;
  return function () {
    var _arguments8 = arguments;
    return function () {
      return _arguments8;
    };
  };
};

eleven()(1, 2, 3)();

var twelve = function () {
  var arguments = 2;
  return class {
    m() {
      var _arguments9 = arguments;
      return function () {
        return _arguments9;
      };
    }

  };
};

twelve();
