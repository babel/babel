export const [void, { p: void, ...shouldSplit }] = [0, { p: 1, q: 2, r: 3 }];

let q;

export const shouldNotSplit = [void, { p: void, ...q }] = [0, { p: 1, q: 2, r: 3 }];

export function shouldNotTransform() {}
