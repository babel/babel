var t = require("./types");
var _ = require("lodash");

var types = require("ast-types");
var def   = types.Type.def;
var or    = types.Type.or;

// Program wrapper
def("File")
  .bases("Node")
  .build("program")
  .field("program", def("Program"));

// Non-standard Acorn type
def("ParenthesizedExpression")
  .bases("Expression")
  .build("expression")
  .field("expression", def("Expression"));

// Acorn - Same as ImportNamespaceSpecifier but `id` is `name`
def("ImportBatchSpecifier")
  .bases("Specifier")
  .build("name")
  .field("name", def("Identifier"));

// Abstract references
def("VirtualPropertyExpression")
  .bases("Expression")
  .build("object", "property")
  .field("object", def("Expression"))
  .field("property", or(def("Identifier"), def("Expression")));

types.finalize();

var estraverse = require("estraverse");
_.extend(estraverse.VisitorKeys, t.VISITOR_KEYS);
