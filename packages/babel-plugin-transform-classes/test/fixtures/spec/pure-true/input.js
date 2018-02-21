import ImportedClass from "./ImportedClass";

const fn = () => "fn";

class MyClass1 {
  method() {}
}

class MyClass2 {
  static method() {}
}

class MyClass3 extends GlobalClass {
  method() {}
}

class MyClass4 extends ImportedClass {
  method() {}
}

class MyClass5 extends fn() {
  method() {}
}

class MyClass6 {
  [2 + 2]() {}
}

class MyClass7 {
  [fn()]() {}
}

class MyClass8 {
  static [fn()]() {}
}
