// These parentheses should be kept
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

type t11 = keyof (() => c);
