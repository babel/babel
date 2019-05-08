declare const x: number;
declare function f(): void;
declare class C {}
declare enum E {}
declare module "m" {}
declare module M {}
declare namespace N {}
export interface I {}
export type T = number;
export class C2 {}

export { x, f, E, C }; // only E
export { M, N, I as I1, T as T1 }; // everything removed
export {
  x as x2,
  f as f2,
  C as CC2,
  E as E2,
  M as M2,
  N as N2,
  I as I2,
  T as T2,
  C2 as C3
}; // only E and C2

interface II2 {}
type AA = {};
enum BB {
  K
}
enum BB {
  L = "LL"
}
export { II2, AA, BB };  // only BB
export { II2 as II3, AA as AA2 };  // everything removed
export { BB as BB1 }; // as-is

interface II3 {}
type AA2 = {};
enum BB2 {}
function foo() {}
export { II3 as default, AA2 as A, BB2 as BB3, foo }; // only BB2 and foo

// export an interface before declaration
export { Bar } // everything removed
export { Bar as Bar2, C2 as C4 } // only C4
interface Bar {}
