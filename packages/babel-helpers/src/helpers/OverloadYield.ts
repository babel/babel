/* @minVersion 7.18.14 */

/*
 * 'kind' is an enum:
 *   0 => This yield was an await expression
 *   1 => This yield comes from yield*
 */

// _OverloadYield is actually a class
declare class _OverloadYield<T = any> {
  constructor(value: T, /** 0: await 1: delegate */ kind: 0 | 1);

  v: T;
  /** 0: await 1: delegate */
  k: 0 | 1;
}

// The actual implementation of _OverloadYield starts here
function _OverloadYield<T>(
  this: _OverloadYield<T>,
  value: T,
  /** 0: await 1: delegate */ kind: 0 | 1,
) {
  this.v = value;
  this.k = kind;
}

export { _OverloadYield as default };
