const first = {
  b: 'b'
};
const second = babelHelpers.defineProperty({
  ...first,
  a: 'a'
}, 'c', 'c');
const third = {
  ...second
};