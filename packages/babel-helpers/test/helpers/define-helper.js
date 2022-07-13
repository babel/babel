import path from "path";
import _template from "@babel/template";
import _helpers from "../../lib/helpers.js";
const template = _template.default || _template;
const helpers = _helpers.default || _helpers;

function getHelperId(baseURL, name) {
  const testName = path.basename(new URL(".", baseURL).pathname);
  return `_$_${testName}_${name}`;
}

export default function defineHelper(baseURL, name, code) {
  const id = getHelperId(baseURL, name);
  if (id in helpers) {
    throw new Error(`The ${id} helper is already defined.`);
  }
  Object.defineProperty(helpers, id, {
    value: {
      minVersion: "7.0.0-beta.0",
      ast: template.program(code),
    },
  });
  return id;
}
