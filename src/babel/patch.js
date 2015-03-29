import estraverse from "estraverse";
import extend from "lodash/object/extend";
import types from "ast-types";
import * as t from "./types";

// estraverse

extend(estraverse.VisitorKeys, t.VISITOR_KEYS);

// regenerator-babel/ast-types

var def = types.Type.def;
var or  = types.Type.or;

def("File")
  .bases("Node")
  .build("program")
  .field("program", def("Program"));

def("AssignmentPattern")
  .bases("Pattern")
  .build("left", "right")
  .field("left", def("Pattern"))
  .field("right", def("Expression"));

def("RestElement")
  .bases("Pattern")
  .build("argument")
  .field("argument", def("expression"));

def("DoExpression")
  .bases("Expression")
  .build("body")
  .field("body", [def("Statement")]);

def("ExportDefaultDeclaration")
  .bases("Declaration")
  .build("declaration")
  .field("declaration", or(
    def("Declaration"),
    def("Expression"),
    null
  ));

def("ExportNamedDeclaration")
  .bases("Declaration")
  .build("declaration")
  .field("declaration", or(
    def("Declaration"),
    def("Expression"),
    null
  ))
  .field("specifiers", [or(
    def("ExportSpecifier")
  )])
  .field("source", or(def("ModuleSpecifier"), null));

types.finalize();
