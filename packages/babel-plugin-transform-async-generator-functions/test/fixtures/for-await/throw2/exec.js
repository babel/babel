let returnCalled = false;

let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => {
        throw "next"
      },
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
    for await (value of iterable);
  } catch (err) {
    expect(err).toBe("next");
  }
  expect(returnCalled).toBe(true);
}();
