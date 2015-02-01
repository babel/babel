module.exports = CreateClassOptimiser;

var BaseOptimiser = require("./base");
var util          = require("../../../../util");
var t             = require("../../../../types");

function CreateClassOptimiser() {
  BaseOptimiser.apply(this, arguments);
}

util.inherits(CreateClassOptimiser, BaseOptimiser);

/**
 * Get all function expressions.
 */

CreateClassOptimiser.prototype.getMethods = function () {
  var props = this.node.properties;

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];

    // irrelevant
    if (!t.isFunctionExpression(prop.value)) continue;

    // deopt
    if (prop.computed) continue;

    this.methods[prop.key.name] = prop;
  }
};

/**
 * Find a `propTypes` property.
 */

CreateClassOptimiser.prototype.getTypes = function () {
  var props = this.node.properties;

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var key  = t.toComputedKey(prop, prop.key);

    if (t.isLiteral(key, { value: "propTypes" }) && t.isObjectExpression(prop.value)) {
      this.addPropTypes(prop.value);
      return;
    }
  }

  // not found
};
