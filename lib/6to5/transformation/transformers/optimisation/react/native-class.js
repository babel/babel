module.exports = NativeClassOptimiser;

var BaseOptimiser = require("./base");
var util          = require("../../../../util");
var t             = require("../../../../types");

function NativeClassOptimiser() {
  BaseOptimiser.apply(this, arguments);
}

util.inherits(NativeClassOptimiser, BaseOptimiser);

/**
 * Get all instance methods.
 */

NativeClassOptimiser.prototype.getMethods = function () {
  var body = this.node.body;

  for (var i = 0; i < body.length; i++) {
    var node = body[i];

    // PrivateDeclaration etc
    if (!t.isMethodDefinition(node)) continue;

    // deopt
    if (node.computed) continue;

    // irrelevant
    if (node.static) continue;

    this.methods[node.key.name] = node;
  }
};

/**
 * Description
 */

NativeClassOptimiser.prototype.getTypes = function () {

};
