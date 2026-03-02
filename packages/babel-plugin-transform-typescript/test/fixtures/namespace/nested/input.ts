class A { }
namespace A {
  export namespace C {
    export class G {}
    export const E = 7;
  }
  function M() {}
  namespace M {
    export const N = C.E;
  }
  export function D() {}
  export namespace D {
    const C = 5;
    export enum H {
      I = 11,
      J = 13,
      K = 17,
    }
  }
  class F {}
  namespace F { var x; }
  namespace G { var x; }
  enum L {
    M = 19,
  }
}
