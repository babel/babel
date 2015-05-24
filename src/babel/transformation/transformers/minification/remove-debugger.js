import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-setup"
};

export function DebuggerStatement(node) {  
  this.remove();  
}
