let throwCalled = false;

let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => ({ done: false, value: 1 }),
      return: () => {
          throwCalled = true;
          throw "return"
        }
    };
  },
};

return async function () {
  let err;
  try {
    for await (const value of iterable) {
      throw "error"
    }
  } catch (e) {
    err = e;
  }
  expect(err).toBe("error");
  expect(throwCalled).toBe(true);
}();
