abstract class Foo {
  accessor prop: number = 1;
  static accessor prop2: number = 1;
  accessor #prop3: number = 1;
  accessor [prop4]: number = 1;
  private accessor prop5: number = 1;
  abstract accessor prop6: number;
  declare accessor prop7: number;
  private accessor #p: any;

  accessor a!;
  abstract accessor #s;
  accessor #d?;
  abstract accessor f = 1;
  readonly accessor g;
}

declare class C {
  accessor x = 1;
  #y = 1;
}
