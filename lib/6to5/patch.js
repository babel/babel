"use strict";

var t = require("./types");
var _ = require("lodash");

// estraverse

var estraverse = require("estraverse");
_.extend(estraverse.VisitorKeys, t.VISITOR_KEYS);

// regenerator/recast/ast-types

var types = require("ast-types");
var def   = types.Type.def;
var or    = types.Type.or;

def("AssignmentPattern")
    .bases("Pattern")
    .build("left", "right")
    .field("left", def("Pattern"))
    .field("right", def("Expression"));

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

def("PrivateDeclaration")
  .bases("Declaration")
  .build("declarations")
  .field("declarations", [def("Identifier")]);

// Playground
def("BindMemberExpression")
  .bases("Expression")
  .build("object", "property", "arguments")
  .field("object", def("Expression"))
  .field("property", or(def("Identifier"), def("Expression")))
  .field("arguments", [def("Expression")]);

def("BindFunctionExpression")
  .bases("Expression")
  .build("callee", "arguments")
  .field("callee", def("Expression"))
  .field("arguments", [def("Expression")]);

types.finalize();
