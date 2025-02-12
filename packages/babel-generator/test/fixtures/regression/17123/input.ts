type t = b | (() => c);
type t2 = b & (() => c);
type t3 = (() => a) extends b ? c : d;
type t4 = a extends (() => b) ? c : d;
type t5 = a extends b ? () => c : d;
type t6 = a extends b ? c : () => d;
type t7 = (() => a)[];
type t8 = (() => a)["name"];

type t9 = (a|b)["name"];
type t10 = (a&b)["name"];

function foo(...args: [number, (() => a)?, ...(() => a)[]]) {}

type t11 = b | (new () => number)
type t12 = b & (new () => number)
type t13 = (new () => number) extends a ? b : c
type t14 = a extends (new () => number) ? b : c
type t15 = (new () => number)[]
type t16 = (new () => number)["name"]

function foo2(...args: [number, (new () => number)?, ...(new () => number)[]]) {}
