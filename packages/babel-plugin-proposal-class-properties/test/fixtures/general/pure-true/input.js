import ImportedClass from "./ImportedClass";
import throttle from "lodash/throttle";

const fn = () => "fn";

class MyClass1 {
  method = () => {};
}

class MyClass2 {
  static method = () => {};
}

class MyClass3 extends GlobalClass {
  method = () => {};
}

class MyClass4 extends ImportedClass {
  method = () => {};
}

class MyClass5 extends fn() {
  method = () => {};
}

class MyClass6 {
  [2 + 2] = () => {};
}

class MyClass7 {
  [fn()] = () => {};
}

class MyClass8 {
  static [fn()] = () => {};
}

class MyClass9 {
  onScroll = throttle(() => {}, 200);
}

class MyClass10 {
  static onScroll = throttle(() => {}, 200);
}

class MyClass11 {
  prop = 2 + 2;
}

class MyClass12 {
  static prop = 2 + 2;
}
