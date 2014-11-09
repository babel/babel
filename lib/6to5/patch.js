var estraverse = require("estraverse");
var types      = require("ast-types");
var t          = require("./types");
var _          = require("lodash");

var def = types.Type.def;

def("ParenthesizedExpression")
  .bases("Expression")
  .build("expression")
  .field("expression", def("Expression"));

_.extend(estraverse.VisitorKeys, t.VISITOR_KEYS);
