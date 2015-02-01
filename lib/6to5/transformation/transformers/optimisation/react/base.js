module.exports = BaseOptimiser;

var object = require("../../../../helpers/object");

/**
 * Description
 *
 * @param {Node} node
 */

function BaseOptimiser(node) {
  this.methods = object();
  this.types   = object();

  this.node  = node;
}

/**
 * Description
 */

BaseOptimiser.prototype.run = function () {
  this.getMethods();
  this.getTypes();
};

/**
 * Add an `ObjectExpression` `node` that contains `propTypes`.
 *
 * Search it and match it against the types that we can optimise
 * and register it for consumption later.
 *
 * @param {Node} node
 */

BaseOptimiser.prototype.addPropTypes = function (node) {
  var props = node.properties;

  for (var i = 0; i < props.length; i++) {
    this.addPropType(props[i]);
  }
};

/**
 * Register a `Property` node as a prop type.
 *
 * We'll try and resolve it to a known type if we can and normalise
 * it for consumption later.
 *
 * @param {Node} prop
 */

BaseOptimiser.prototype.addPropType = function () {

};
