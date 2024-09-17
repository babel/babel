import { execFileSync } from "child_process";
// eslint-disable-next-line import/no-extraneous-dependencies
import { commonJS } from "$repo-utils";
import assert from "assert";

const { __dirname } = commonJS(import.meta.url);

function newTypesFields(babel8) {
  const result = execFileSync(
    process.execPath,
    [
      "-e",
      `import("../lib/index.js").then(t => {console.log(JSON.stringify(t.NODE_FIELDS))})`,
    ],
    {
      encoding: "utf8",
      cwd: __dirname,
      env: {
        ...process.env,
        BABEL_8_BREAKING: babel8 ? "true" : "",
      },
    }
  );

  return JSON.parse(result);
}

export default function () {
  const fieldsBabel7 = newTypesFields();
  const fieldsBabel8 = newTypesFields(true);

  assert.ok(fieldsBabel7["DecimalLiteral"]);
  assert.ok(!fieldsBabel8["DecimalLiteral"]);

  const nodeFieldMap = new Map();

  for (const [type, fields] of Object.entries(fieldsBabel7).concat(
    Object.entries(fieldsBabel8)
  )) {
    const set = nodeFieldMap.get(type) || new Set();
    nodeFieldMap.set(type, set);

    Object.keys(fields).forEach(field => {
      set.add(field);
    });
  }

  return Array.from(nodeFieldMap).map(([type, fields]) => {
    return [type, Array.from(fields)];
  });
}
