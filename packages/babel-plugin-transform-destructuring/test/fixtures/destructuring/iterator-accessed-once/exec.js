// The iterator property must be read only one time when destructuring.
var readCount = 0;
var obj = {};
Object.defineProperty(obj, Symbol.iterator, {
  get: function () {
    readCount++;
    return function () {
      var i = 0;
      return {
        next: function () {
          return i < 2 ? { done: false, value: i++ } : { done: true };
        },
      };
    };
  },
});

// slicedToArray
var [a] = obj;
expect(a).toBe(0);
expect(readCount).toBe(1);

// toArray
readCount = 0;
var [b, ...rest] = obj;
expect(b).toBe(0);
expect(rest).toEqual([1]);
expect(readCount).toBe(1);
