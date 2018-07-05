var foo = function () {
  return _wrapped.apply(this, arguments);
};

function _wrapped3() {
  _wrapped3 = babelHelpers.asyncToGenerator(function* () {
    var wat = yield foo();
  });
  return _wrapped3.apply(this, arguments);
}

var foo2 = function () {
  return _wrapped2.apply(this, arguments);
},
    bar = function () {
  return _wrapped3.apply(this, arguments);
},
    function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  });
  return _wrapped2.apply(this, arguments);
},
    function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  });
  return _wrapped.apply(this, arguments);
};
