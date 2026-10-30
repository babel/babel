import type * as t from "@babel/types";

import * as generatorFunctions from "./generators/index.ts";
import type { NodeHandler } from "./node/index.ts";
import type Printer from "./printer.ts";

declare global {
  function __node(type: t.Node["type"]): number;
}

type GeneratorInfo = [
  (this: Printer, node: t.Node, parent?: t.Node | null) => void,
  number,
  NodeHandler<boolean> | undefined,
];

// A plain object is faster than a Map for string-keyed lookups, since
// V8 can inline the dictionary lookup in the keyed load IC.
const generatorInfos: Record<string, GeneratorInfo | undefined> =
  Object.create(null);
let index = 0;

for (const key of Object.keys(generatorFunctions).sort() as Exclude<
  keyof typeof generatorFunctions,
  `_${string}`
>[]) {
  if (key.startsWith("_")) continue;
  generatorInfos[key] = [
    generatorFunctions[key] as (
      this: Printer,
      node: t.Node,
      parent?: t.Node | null,
    ) => void,
    index++,
    undefined,
  ];
}

export { generatorInfos };
