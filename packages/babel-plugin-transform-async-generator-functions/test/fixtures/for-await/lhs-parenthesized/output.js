function f() {
  return _f.apply(this, arguments);
}
function _f() {
  _f = babelHelpers.asyncToGenerator(function* () {
    var _iteratorAbruptCompletion = false;
    var _didIteratorError = false;
    var _iteratorError;
    try {
      for (var _iterator = babelHelpers.asyncIterator(y), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
        a = _step.value;
        {
          ;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion && _iterator.return != null) {
          yield _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    var _iteratorAbruptCompletion2 = false;
    var _didIteratorError2 = false;
    var _iteratorError2;
    try {
      for (var _iterator2 = babelHelpers.asyncIterator(y), _step2; _iteratorAbruptCompletion2 = !(_step2 = yield _iterator2.next()).done; _iteratorAbruptCompletion2 = false) {
        b = _step2.value;
        {
          ;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion2 && _iterator2.return != null) {
          yield _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
    var _iteratorAbruptCompletion3 = false;
    var _didIteratorError3 = false;
    var _iteratorError3;
    try {
      for (var _iterator3 = babelHelpers.asyncIterator(y), _step3; _iteratorAbruptCompletion3 = !(_step3 = yield _iterator3.next()).done; _iteratorAbruptCompletion3 = false) {
        o.p = _step3.value;
        {
          ;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion3 && _iterator3.return != null) {
          yield _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  });
  return _f.apply(this, arguments);
}
