import { arr } from "./dep.js";
export class A {
  prop = (() => (arr + 1) * 2)();
}
