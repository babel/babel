export class N {
  f1(value: N.I) {
    value.f2();
  }
}
export declare namespace N {
  export interface I {
    f2();
  }
}
export default N;
