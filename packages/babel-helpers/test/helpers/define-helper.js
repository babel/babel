import path from "path";
import _template from "@babel/template";
import _helpers from "../../lib/helpers-generated.js";
const template = _template.default || _template;
const helpers = _helpers.default || _helpers;

import { getHelperMetadata } from "../../scripts/generate-helpers.js";

function getHelperId(baseURL, name) {
  const testName = path.basename(new URL(".", baseURL).pathname);
  return `_$_${testName}_${name}`;
}

export function defineHelperAndGetMetadata(baseURL, name, code) {
  const id = getHelperId(baseURL, name);
  if (id in helpers) {
    throw new Error(`The ${id} helper is already defined.`);
  }

  let metadata;
  [code, metadata] = getHelperMetadata(code, name);

  Object.defineProperty(helpers, id, {
    value: {
      minVersion: "7.0.0-beta.0",
      ast: template.program(code),
      metadata,
    },
  });
  return { id, metadata };
}

export default function defineHelper(baseURL, name, code) {
  return defineHelperAndGetMetadata(baseURL, name, code).id;
}
