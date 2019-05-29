type U = {};
type V = {};
type T1 = { ...U
};
type T2 = { ...U,
  ...V,
};
type T3 = {
  p: V,
  ...U,
};
type T4 = { ...U,
  p: V,
};
type T5 = { ...{} | {
    p: V
  }
};
type T6 = {
  foo(): number
};
type T7 = {
  foo: () => number
};
type T8 = {
  [string]: U
};
type T9 = {
  [param: string]: U
};
type T10 = {...};
type T11 = {
  a: {
    b: {
      c: {...},
      ...
    },
    ...
  }
};
type T12 = {
  foo: number,
  ...
};
type T13 = {
  foo: number,
  bar: string,
  ...
};
