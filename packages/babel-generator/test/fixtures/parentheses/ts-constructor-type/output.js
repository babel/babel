// These parentheses should be kept
type t11 = b | (new () => number);
type t12 = b & (new () => number);
type t13 = (new () => number) extends a ? b : c;
type t14 = a extends (new () => number) ? b : c;
type t15 = (new () => number)[];
type t16 = (new () => number)["name"];
function foo2(...args: [number, (new () => number)?, ...(new () => number)[]]) {}