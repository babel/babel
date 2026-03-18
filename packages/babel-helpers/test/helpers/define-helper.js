import path from "node:path";
import template from "@babel/template";
import helpers from "../../lib/helpers-generated.js";

import { getHelperMetadata } from "../../scripts/build-helper-metadata.js";

function getHelperId(baseURL, name) {
  const testName = path.basename(new URL(".", baseURL).pathname);
  return `_$_${testName}_${name}`;
}

export function defineHelperAndGetMetadata(babel, baseURL, name, code) {
  const id = getHelperId(baseURL, name);
  if (id in helpers) {
    throw new Error(`The ${id} helper is already defined.`);
  }

  let metadata;
  [code, metadata] = getHelperMetadata(babel, code, name);

  Object.defineProperty(helpers, id, {
    value: {
      minVersion: "7.0.0-beta.0",
      ast: template.program(code),
      metadata,
    },
  });
  return { id, metadata };
}

export default function defineHelper(babel, baseURL, name, code) {
  return defineHelperAndGetMetadata(babel, baseURL, name, code).id;
}
