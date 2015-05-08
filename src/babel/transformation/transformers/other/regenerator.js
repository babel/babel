import regenerator from "regenerator";
import * as t from "../../../types";

export var metadata = {
  category: "builtin-modules"
};

export var Program = {
  exit(ast) {
    regenerator.transform(ast);
  }
};
