// These parentheses should be kept
type t0 = b | (new () => number)
type t1 = b & (new () => number)
type t2 = (new () => number) extends a ? b : c
type t3 = a extends (new () => number) ? b : c
type t4 = (new () => number)[]
type t5 = (new () => number)["name"]

function foo2(...args: [number, (new () => number)?, ...(new () => number)[]]) {}

type t6 = keyof (new () => number);
