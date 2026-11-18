import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";
import classProperties from "@babel/plugin-transform-class-properties";

// On its own, this plugin's `loose` doesn't change the output: it only has to
// match the `loose` of the class fields and private methods plugins.
testLooseAssumptions(
  plugin,
  ["privateFieldsAsProperties", "setPublicClassFields"],
  `
class A {
  #a = 1;
  b = 2;
  c(d) {
    return #a in d;
  }
}
`,
  { companions: [classProperties] },
);
