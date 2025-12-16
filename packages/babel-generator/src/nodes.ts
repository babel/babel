import type * as t from "@babel/types";

import * as generatorFunctions from "./generators/index.ts";
import * as deprecatedGeneratorFunctions from "./generators/deprecated.ts";
import type { NodeHandler } from "./node/index.ts";
import type Printer from "./printer.ts";

declare global {
  function __node(type: t.Node["type"]): number;
}

const generatorInfosMap = new Map<
  string,
  [
    (this: Printer, node: t.Node, parent?: t.Node | null) => void,
    number,
    NodeHandler<boolean> | undefined,
  ]
>();
let index = 0;

for (const key of Object.keys(generatorFunctions).sort() as Exclude<
  keyof typeof generatorFunctions,
  `_${string}`
>[]) {
  if (key.startsWith("_")) continue;
  generatorInfosMap.set(key, [generatorFunctions[key], index++, undefined]);
}
if (!process.env.BABEL_8_BREAKING) {
  for (const key of Object.keys(
    deprecatedGeneratorFunctions,
  ) as (keyof typeof deprecatedGeneratorFunctions)[]) {
    generatorInfosMap.set(key, [
      deprecatedGeneratorFunctions[key],
      index++,
      undefined,
    ]);
  }
}

export { generatorInfosMap };
