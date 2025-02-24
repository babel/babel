const first = {
  b: 'b',
}

const second = {
  ...first,
  a: 'a',
  ['c']: 'c',
}

const third = {...second}