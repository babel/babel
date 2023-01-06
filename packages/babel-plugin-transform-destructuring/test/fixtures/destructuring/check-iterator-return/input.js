var [] = {
  [Symbol.iterator]: () => {
    return {
      return: () => {},
    };
  },
};

var [] = {
  [Symbol.iterator]: () => {
    return {
      return: () => ({}),
    };
  },
};

var [x] = {
  [Symbol.iterator]: () => {
    return {
      next: () => ({ done: false, value: 1 }),
      return: () => {},
    };
  },
};

var [x] = {
  [Symbol.iterator]: () => {
    return {
      next: () => ({ done: false, value: 1 }),
      return: () => ({}),
    };
  },
};
