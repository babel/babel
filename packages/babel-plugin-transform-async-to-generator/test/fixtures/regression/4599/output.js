function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    return yield promise;
  });
  return _wrapped.apply(this, arguments);
}

(function () {
  return _wrapped.apply(this, arguments);
});

function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(function* () {
    yield promise;
  });
  return _wrapped2.apply(this, arguments);
}

(function () {
  return _wrapped2.apply(this, arguments);
});
