const first = {
  b: 'b'
};
const third = {
  d: 'd'
};
const second = babelHelpers.defineProperty({
  ...first,
  a: 'a',
  ...third
}, 'c', 'c');