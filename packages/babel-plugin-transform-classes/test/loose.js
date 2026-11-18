import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  [
    "setClassMethods",
    "constantSuper",
    "superIsCallableConstructor",
    "noClassCalls",
    "noClassPrototypeAssign",
    "noConstructorPrimitiveReturn",
  ],
  `
class A extends B {
  constructor() {
    super();
    return this;
  }
  m() {
    super.m();
  }
}
`,
);
