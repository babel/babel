module.exports = Position;

var _ = require("lodash");

function Position() {
  this.line = 1;
  this.column = 0;
}

Position.prototype.push = function (str) {
  var self = this;

  _.each(str, function (cha) {
    if (cha === "\n") {
      self.line++;
      self.column = 0;
    } else {
      self.column++;
    }
  });
};

Position.prototype.unshift = function (str) {
  var self = this;

  _.each(str, function (cha) {
    if (cha === "\n") {
      self.line--;
    } else {
      self.column--;
    }
  });
};
