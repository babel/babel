/* @minVersion 7.18.14 */

/*
 * 'kind' is an enum:
 *   0 => This yield was an await expression
 *   1 => This yield comes from yield*
 */

// _OverloadYield is actually a class
// @ts-expect-error -- intentionally overload the class
declare class _OverloadYield<T = any, K = any> {
  v: T;
  k: K;
  constructor(value: T, kind: K);
}

// The actual implementation of _OverloadYield starts here
// @ts-expect-error -- intentionally overload the class
export default function _OverloadYield<T, K>(
  this: _OverloadYield<T, K>,
  value: T,
  kind: K,
) {
  this.v = value;
  this.k = kind;
}
