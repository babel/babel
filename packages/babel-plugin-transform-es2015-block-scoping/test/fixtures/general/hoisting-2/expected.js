var _ref5 = function (j, result, i) {
  result.push(i, j, function () {
    return i + ':' + j;
  });
};

var _ref = function (i, result) {
  var _loop6 = _ref5;

  for (var j = 9; j > 7; j--) {
    _loop6(j, result, i);
  }
};

function test() {
  var result = [];
  var _loop = _ref;
  for (var i = 1; i < 3; i++) {
    _loop(i, result);
  }
}

var _ref2 = function (i) {
  setTimeout(function () {
    console.log(i);
  }, 10);
};

function test() {
  var _loop2 = _ref2;

  for (var i = 0; i < 10; i++) {
    _loop2(i);
  }
}

function test() {
  var a = 0;

  function other() {
    console.log(a);
  }

  var _loop3 = function (i, other) {
    justDoShit(function () {
      console.log(a++, i);
      other();
    }, 10);
  };

  for (var i = 0; i < 10; i++) {
    _loop3(i, other);
  }
}

var _ref3 = function (i, _this) {
  setTimeout(function () {
    console.log(_this, i);
    other();
  }, 10);
};

function test() {
  var _this = this;

  var _loop4 = _ref3;

  for (var i = 0; i < 10; i++) {
    _loop4(i, _this);
  }
}

var _ref4 = function (i, _arguments) {
  setTimeout(function () {
    console.log(_arguments, i);
    other();
  }, 10);
};

function test() {
  var _arguments = arguments;
  var _loop5 = _ref4;

  for (var i = 0; i < 10; i++) {
    _loop5(i, _arguments);
  }
}
