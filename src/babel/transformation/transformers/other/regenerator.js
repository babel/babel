import regenerator from "regenerator";
import * as t from "../../../types";

export var Program = {
  exit(ast) {
    regenerator.transform(ast);
  }
};
