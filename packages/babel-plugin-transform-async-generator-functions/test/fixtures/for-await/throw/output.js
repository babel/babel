let returnCalled = false;
let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => ({
        done: false,
        value: 1
      }),
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
          throw "error";
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
    expect(err).toBe("error");
  }
  expect(returnCalled).toBe(true);
})();
