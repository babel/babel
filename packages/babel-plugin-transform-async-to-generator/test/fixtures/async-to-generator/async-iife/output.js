function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    yield 'ok';
  });
  return _wrapped.apply(this, arguments);
}

(function () {
  return _wrapped.apply(this, arguments);
})();

function _wrapped2() {
  _wrapped2 = babelHelpers.asyncToGenerator(function* () {
    yield 'ok';
  });
  return _wrapped2.apply(this, arguments);
}

(function () {
  return _wrapped2.apply(this, arguments);
})();

function _notIIFE() {
  _notIIFE = babelHelpers.asyncToGenerator(function* notIIFE() {
    yield 'ok';
  });
  return _notIIFE.apply(this, arguments);
}

(function notIIFE() {
  return _notIIFE.apply(this, arguments);
});

function _wrapped3() {
  _wrapped3 = babelHelpers.asyncToGenerator(function* () {
    yield 'not iife';
  });
  return _wrapped3.apply(this, arguments);
}

(function () {
  return _wrapped3.apply(this, arguments);
});
