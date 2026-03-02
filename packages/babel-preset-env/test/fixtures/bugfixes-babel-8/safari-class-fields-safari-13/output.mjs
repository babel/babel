import { arr } from "./dep.js";
export class A {
  constructor() {
    babelHelpers.defineProperty(this, "prop", (arr + 1) * 2);
  }
}
