let throwCalled = false;
let i;
let iterable = {
  [Symbol.asyncIterator || "@@asyncIterator"]() {
    return {
      next: () => {
        i++;
        if(i) return { done: false, value: 1 };

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
