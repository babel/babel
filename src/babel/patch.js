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

types.finalize();
