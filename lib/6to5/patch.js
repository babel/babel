var t = require("./types");
var _ = require("lodash");

var types = require("ast-types");
var def   = types.Type.def;

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

// Same as ImportNamespaceSpecifier but `id` is `name`
def("ImportBatchSpecifier")
  .bases("Specifier")
  .build("name")
  .field("name", def("Identifier"));

var estraverse = require("estraverse");
_.extend(estraverse.VisitorKeys, t.VISITOR_KEYS);
