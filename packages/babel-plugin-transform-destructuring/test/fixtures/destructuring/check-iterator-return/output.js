babelHelpers.slicedToArray({
  [Symbol.iterator]: () => {
    return {
      return: () => {}
    };
  }
}, 0);
babelHelpers.slicedToArray({
  [Symbol.iterator]: () => {
    return {
      return: () => ({})
    };
  }
}, 0);
var x = babelHelpers.slicedToArray({
  [Symbol.iterator]: () => {
    return {
      next: () => ({
        done: false,
        value: 1
      }),
      return: () => {}
    };
  }
}, 1)[0];
var x = babelHelpers.slicedToArray({
  [Symbol.iterator]: () => {
    return {
      next: () => ({
        done: false,
        value: 1
      }),
      return: () => ({})
    };
  }
}, 1)[0];
