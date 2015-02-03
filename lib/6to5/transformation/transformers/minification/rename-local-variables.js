var t = require("../../../types");

exports.optional = true;

exports.Scope = function () {
  // todo: get all binding identifiers, generate compact names
  // that wont collide and then call the remap identifier helper
  // this transformer **has** to be ran last as it will absolutley
  // destroy the scope tree
};
