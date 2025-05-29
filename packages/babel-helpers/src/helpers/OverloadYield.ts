/* @minVersion 7.18.14 */

const enum Kind {
  // This yield was an await expression
  Await = 0,
  // This yield comes from yield*
  Delegate = 1,
}

// _OverloadYield is actually a class
declare class _OverloadYield<T = any> {
  constructor(value: T, /** 0: await 1: delegate */ kind: 0 | 1);

  v: T;
  k: Kind;
}

// The actual implementation of _OverloadYield starts here
function _OverloadYield<T>(this: _OverloadYield<T>, value: T, kind: Kind) {
  this.v = value;
  this.k = kind;
}

export { _OverloadYield as default };
