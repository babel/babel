"use strict";

class Base {
  method() {
    return 'Hello!';
  }
}
class Derived extends Base {
  method() {
    return super.method === null || super.method === void 0 ? void 0 : super.method();
  }
}
