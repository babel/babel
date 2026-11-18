import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  ["privateFieldsAsProperties", "setPublicClassFields", "constantSuper"],
  `
class A extends B {
  static a = super.a;
  #b = 1;
  c() {
    return this.#b;
  }
}
`,
);
