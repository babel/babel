import { bare } from "../../helpers/name-method";

export var metadata = {
  group: "builtin-basic"
};

export var visitor = {
  "ArrowFunctionExpression|FunctionExpression": {
    exit: bare
  }
};
