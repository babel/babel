class MyClass2 extends BaseClass {
  override constructor() {}
  override [x: string]: any;
  override static size = 5;
  static override size = 5;
}

declare class MyClass3 extends BaseClass {
  declare override prop1: any
  override declare prop2: any
}

class MyClass4 {
  override prop: any
}
