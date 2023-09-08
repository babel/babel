let returnCalled = false;
let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => {
        throw "next";
      },
      return: () => {
        returnCalled = true;
        throw "return";
      }
    };
  }
};
return babelHelpers.asyncToGenerator(function* () {
  let value;
  try {
    var _step = {};
    try {
      for (var _iterator = babelHelpers.asyncIterator(iterable); !(_step = yield _iterator.next()).done;) {
        value = _step.value;
        {
          ;
        }
      }
    } finally {
      try {
        if (!_step.done && _iterator.return != null) {
          yield _iterator.return();
        }
      } catch (e) {}
    }
  } catch (err) {
    expect(err).toBe("next");
  }
  expect(returnCalled).toBe(true);
})();
