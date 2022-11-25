expect(() => {
  var [] = {
    [Symbol.iterator]: () => {
      return {
        return: () => {},
      };
    },
  };
}).toThrow(TypeError);

expect(() => {
  var [] = {
    [Symbol.iterator]: () => {
      return {
        return: () => ({}),
      };
    },
  };
}).not.toThrow();

expect(() => {
  var [x] = {
    [Symbol.iterator]: () => {
      return {
        next: () => ({ done: false, value: 1 }),
        return: () => {},
      };
    },
  };
}).toThrow(TypeError);

expect(() => {
  var [x] = {
    [Symbol.iterator]: () => {
      return {
        next: () => ({ done: false, value: 1 }),
        return: () => ({}),
      };
    },
  };
}).not.toThrow();
