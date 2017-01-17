declare function a(x: mixed): boolean %checks(x !== null);
var b = (x: mixed): %checks => typeof x === "string";
function c(x: mixed): %checks {
  return typeof x === "string";
};
declare function d<T, P: $Pred<1>>(v: Array<T>, cb: P): Array<$Refine<T, P, 1>>;
