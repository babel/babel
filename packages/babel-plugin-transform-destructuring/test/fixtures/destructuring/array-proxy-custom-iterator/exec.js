// https://github.com/babel/babel/issues/18181
// Array destructuring must use the iterator protocol, even when the target
// is an array-backed Proxy: Array.isArray pierces the Proxy, but a custom
// Symbol.iterator must still take precedence over positional reads.
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

const [first] = proxy;
expect(first).toBe("iterator-value");

// Plain arrays keep the fast path.
const [a, ...rest] = [1, 2, 3];
expect(a).toBe(1);
expect(rest).toEqual([2, 3]);
