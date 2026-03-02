"use strict";

class Base {
  method() {
    return 'Hello!';
  }
}
class Derived extends Base {
  method() {
    var _super$method;
    return (_super$method = super.method) == null ? void 0 : _super$method.call(this);
  }
}
