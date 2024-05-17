/* @minVersion 7.18.14 */

/*
 * 'kind' is an enum:
 *   0 => This yield was an await expression
 *   1 => This yield comes from yield*
 */

// _OverloadYield is actually a class
interface _OverloadYield<T = any> {
  v: T;
  /** 0: await 1: delegate */
  k: 0 | 1;
}

interface _OverloadYieldConstructor {
  new <T>(value: T, /** 0: await 1: delegate */ kind: 0 | 1): _OverloadYield<T>;
}

// The actual implementation of _OverloadYield starts here
var _OverloadYield = function <T>(
  this: _OverloadYield<T>,
  value: T,
  /** 0: await 1: delegate */ kind: 0 | 1,
) {
  this.v = value;
  this.k = kind;
} as any as _OverloadYieldConstructor;

export default _OverloadYield;
