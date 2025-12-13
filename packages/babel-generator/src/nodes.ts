import type * as t from "@babel/types";

import * as generatorFunctions from "./generators/index.ts";
import * as deprecatedGeneratorFunctions from "./generators/deprecated.ts";

const generatorInfosMap = new Map<
  string,
  [Function, number, Function | undefined]
>();
const generatorNamesRecord = {} as Record<`${t.Node["type"]}Id`, number>;
let index = 0;

for (const key of Object.keys(
  generatorFunctions,
) as (keyof typeof generatorFunctions)[]) {
  if (key.startsWith("_")) continue;
  generatorNamesRecord[`${key}Id` as `${t.Node["type"]}Id`] = index;
  generatorInfosMap.set(key, [generatorFunctions[key], index++, undefined]);
}
if (!process.env.BABEL_8_BREAKING) {
  for (const key of Object.keys(
    deprecatedGeneratorFunctions,
  ) as (keyof typeof deprecatedGeneratorFunctions)[]) {
    generatorNamesRecord[`${key}Id`] = index;
    generatorInfosMap.set(key, [
      deprecatedGeneratorFunctions[key],
      index++,
      undefined,
    ]);
  }
}

export { generatorInfosMap, generatorNamesRecord };
