import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  ["privateFieldsAsProperties", "constantSuper"],
  `
class A extends B {
  #a() {
    return super.a;
  }
  b() {
    this.#a();
  }
}
`,
);
