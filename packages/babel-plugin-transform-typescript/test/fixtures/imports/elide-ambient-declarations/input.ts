import { A, B, C, D } from "a";

declare namespace N {
  class X extends A {}
}

declare module "m" {
  export class X extends B {}
}

declare global {
  class X extends C {}
}

declare enum E {
  X = D.x,
}
