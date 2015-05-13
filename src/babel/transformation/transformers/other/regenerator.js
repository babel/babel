import regenerator from "regenerator";
import * as t from "../../../types";

export var metadata = {
  group: "regenerator"
};

export function Program(ast) {
  regenerator.transform(ast);
  this.stop();
}
