import path from "path";
import runFixtureTests from "./helpers/run-fixture-tests.js";
import { parse } from "../lib/index.js";
import { fileURLToPath } from "url";
import { VISITOR_KEYS } from "@babel/types";

runFixtureTests(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures"),
  (input, options = {}) => {
    const plugins = options.plugins || [];
    const ast = parse(input, { ...options, plugins: plugins.concat("estree") });

    const stack = [ast];

    let node;
    while ((node = stack.pop())) {
      const keys = VISITOR_KEYS[node.type];
      if (!keys) continue;

      const loc = node.loc;
      if (
        Object.prototype.propertyIsEnumerable.call(loc.start, "index") ||
        Object.prototype.propertyIsEnumerable.call(loc.end, "index")
      ) {
        throw Error("loc.index should be not enumerable with estree");
      }

      for (const key of keys) {
        const subNode = node[key];

        if (Array.isArray(subNode)) {
          for (const child of subNode) {
            stack.push(child);
          }
        } else if (typeof subNode === "object" && subNode !== null) {
          stack.push(subNode);
        }
      }
    }

    return ast;
  },
  true,
);
