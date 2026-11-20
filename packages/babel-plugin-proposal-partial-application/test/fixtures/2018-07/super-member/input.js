"use strict";

class C extends class {
  static add(x, y) {
    return x + y; // Algebraic addition
  }
}
{
  static add(x, y) {
    return [x, y]; // Pair construction
  }
  static addOne = super.add(1, ?);
}
