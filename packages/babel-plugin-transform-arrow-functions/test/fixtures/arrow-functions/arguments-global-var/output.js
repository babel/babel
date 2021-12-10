var arguments = 1;

function fn() {
  var _arguments = arguments;

  var foo = function () {
    return _arguments;
  };
}

var bar = function () {
  return arguments;
};

var baz = function () {
  var _arguments2 = arguments;
  return function () {
    return _arguments2;
  };
};
