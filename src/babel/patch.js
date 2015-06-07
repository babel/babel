import estraverse from "estraverse";
import extend from "lodash/object/extend";
import types from "ast-types";
import * as t from "./types";

// estraverse

extend(estraverse.VisitorKeys, t.VISITOR_KEYS);

// regenerator/ast-types

var def = types.Type.def;
var or  = types.Type.or;

//def("File")
//  .bases("Node")
//  .build("program")
//  .field("program", def("Program"));

def("Noop");

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

def("Super")
  .bases("Expression");

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

def("ExportNamespaceSpecifier")
  .bases("Specifier")
  .field("exported", def("Identifier"));

def("ExportDefaultSpecifier")
  .bases("Specifier")
  .field("exported", def("Identifier"));

def("ExportAllDeclaration")
  .bases("Declaration")
  .build("exported", "source")
  .field("exported", def("Identifier"))
  .field("source", def("Literal"));

def("BindExpression")
  .bases("Expression")
  .build("object", "callee")
  .field("object", or(def("Expression"), null))
  .field("callee", def("Expression"));

types.finalize();
