var _;
const [, {
  p: _2,
  ...shouldSplit
}] = [0, {
  p: 1,
  q: 2,
  r: 3
}];
export { shouldSplit };
export const shouldNotSplit = [, {
  p: _,
  ...q
}] = [0, {
  p: 1,
  q: 2,
  r: 3
}];
export function shouldNotTransform() {}
