let useState = [{
  some: 42
}, () => null];
let {
    0: {
      numeric
    },
    '2': {
      str
    },
    1: setState
  } = useState,
  rest1 = babelHelpers.objectWithoutProperties(useState[0], ["numeric"]),
  rest2 = babelHelpers.objectWithoutProperties(useState['2'], ["str"]);
