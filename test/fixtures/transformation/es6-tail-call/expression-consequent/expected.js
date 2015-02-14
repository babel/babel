"use strict";

function f() {
  _function: while (true) {
    if (true) {} else {
      continue _function;
    }
  }
}
