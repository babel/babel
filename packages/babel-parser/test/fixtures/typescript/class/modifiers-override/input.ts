class MyClass1 extends BaseClass {
  override show() {}
  override public show() {}
  public override show() {}
  override size = 5;
  override readonly size = 5;
  readonly override size = 5;
}

class MyClass2 extends BaseClass {
  override constructor() {}
  override [x: string]: any;
  override static size = 5;
  static override size = 5;
}
