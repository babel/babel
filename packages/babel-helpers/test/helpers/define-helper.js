import path from "path";
import template from "@babel/template";
import helpers from "../../lib/helpers";

function getHelperId(dir, name) {
  const testName = path.basename(dir);
  return `_$_${testName}_${name}`;
}

export default function defineHelper(
  dir: string,
  name: string,
  code: string,
): string {
  const id = getHelperId(dir, name);
  if (id in helpers) {
    throw new Error(`The ${id} helper is already defined.`);
  }
  Object.defineProperty(helpers, id, {
    value: template.program(code),
  });
  return id;
}
