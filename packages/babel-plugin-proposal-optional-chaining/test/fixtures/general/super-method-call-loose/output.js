"use strict";

class Base {
  method() {
    return 'Hello!';
  }
}
class Derived extends Base {
  method() {
    return super.method == null ? void 0 : super.method();
  }
}
