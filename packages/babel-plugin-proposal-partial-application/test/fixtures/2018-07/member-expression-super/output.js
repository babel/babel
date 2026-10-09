"use strict";

var _super$add, _this;
class C extends class {
  static add(x, y) {
    return x + y; // Algebraic addition
  }
} {
  static add(x, y) {
    return [x, y]; // Pair construction
  }
  static addOne = (_this = this, _super$add = super.add, function add(_argPlaceholder) {
    return _super$add.call(_this, 1, _argPlaceholder);
  });
}
