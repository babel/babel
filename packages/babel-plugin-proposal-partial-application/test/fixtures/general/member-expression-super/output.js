"use strict";

var _super$add;
class C extends class {
  static add(x, y) {
    return x + y; // Algebraic addition
  }
} {
  static add(x, y) {
    return [x, y]; // Pair construction
  }
  static addOne = (_super$add = super.add, function add(_argPlaceholder) {
    return _super$add.call(this, 1, _argPlaceholder);
  });
}
