let returnCalled = false;

let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => ({ done: false, value: 1 }),
      return: () => {
          returnCalled = true;
          throw "return"
        }
    };
  },
};

return async function () {
  let value;
  try {
    for await (value of iterable) {
      throw "error"
    }
  } catch (err) {
    expect(err).toBe("error");
  }
  expect(returnCalled).toBe(true);
}();
