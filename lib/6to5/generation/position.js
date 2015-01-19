"use strict";

module.exports = Position;

function Position() {
  this.line = 1;
  this.column = 0;
}

Position.prototype.push = function (str) {
  for (var i = 0; i < str.length; i++) {
    if (str[i] === "\n") {
      this.line++;
      this.column = 0;
    } else {
      this.column++;
    }
  }
};

Position.prototype.unshift = function (str) {
  for (var i = 0; i < str.length; i++) {
    if (str[i] === "\n") {
      this.line--;
    } else {
      this.column--;
    }
  }
};
