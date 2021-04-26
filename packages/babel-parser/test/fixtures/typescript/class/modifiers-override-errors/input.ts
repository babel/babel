class MyClass2 extends BaseClass {
  override constructor() {}
  override [x: string]: any;
}

declare class MyClass3 extends BaseClass {
  declare override prop1: any
  override declare prop2: any
}

class MyClass4 {
  override prop: any
}
