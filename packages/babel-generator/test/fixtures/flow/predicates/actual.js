declare function foo(x: mixed): boolean %checks(x !== null);

declare function my_filter<T, P: $Pred<1>>(v: Array<T>, cb: P): Array<$Refine<T,P,1>>;

declare function f2(x: mixed): string %checks(Array.isArray(x));

function foo(x: mixed): %checks { return typeof x === "string"; }

function is_string(x): boolean %checks {
  return typeof x === "string";
}

var f = (x: mixed): %checks => typeof x === "string";

const foo = (x: mixed): boolean %checks => typeof x === "string";

(x): %checks => x !== null;
