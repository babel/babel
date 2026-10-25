// Spread must use the iterator, even for an array-backed Proxy
// with a custom Symbol.iterator. Same problem as in babel/babel#18181.
const target = ["positional-value"];
const proxy = new Proxy(target, {
  get(t, prop, receiver) {
    if (prop === Symbol.iterator) {
      return function () {
        var done = false;
        return {
          next: function () {
            if (done) return { done: true, value: undefined };
            done = true;
            return { done: false, value: "iterator-value" };
          },
        };
      };
    }
    return Reflect.get(t, prop, receiver);
  },
});

expect([...proxy]).toEqual(["iterator-value"]);

// A plain array still gets copied.
const arr = [1, 2, 3];
const copy = [...arr];
expect(copy).toEqual([1, 2, 3]);
expect(copy).not.toBe(arr);
