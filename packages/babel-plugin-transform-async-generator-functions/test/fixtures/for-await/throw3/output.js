let throwCalled = false;
let i;
let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => {
        i++;
        if (i) return {
          done: false,
          value: 1
        };
        throw "next";
      },
      return: () => {
        throwCalled = true;
        throw "return";
      }
    };
  }
};
return babelHelpers.asyncToGenerator(function* () {
  let err;
  try {
    var _iterator = babelHelpers.asyncIterator(iterable),
      _step,
      _notDone;
    try {
      for (; _notDone = !(_step = yield _iterator.next()).done; _notDone = false) {
        const value = _step.value;
        {
          ;
        }
      }
    } catch (e) {
      _step = null;
      throw e;
    } finally {
      try {
        if (_notDone && _iterator.return) {
          yield _iterator.return();
        }
      } catch (e) {
        if (_step) throw e;
      }
    }
  } catch (e) {
    err = e;
  }
  expect(err).toBe("next");
  expect(throwCalled).toBe(false);
})();
