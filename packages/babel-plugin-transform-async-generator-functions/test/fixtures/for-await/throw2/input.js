let throwCalled = false;

let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => {
        throw "next"
      },
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
    for await (const value of iterable);
  } catch (e) {
    err = e;
  }
  expect(err).toBe("next");
  expect(throwCalled).toBe(false);
}();
