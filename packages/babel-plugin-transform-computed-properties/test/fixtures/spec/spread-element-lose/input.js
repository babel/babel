const first = {
  b: 'b',
}
const third = {
  d: 'd',
}
const second = {
  ...first,
  a: 'a',
  ['c']: 'c',
  ...third,
}