import { bare } from "../../helpers/name-method";

export var metadata = {
  group: "builtin-pre"
};

export var visitor = {
  "ArrowFunctionExpression|FunctionExpression": {
    exit: bare
  }
};
