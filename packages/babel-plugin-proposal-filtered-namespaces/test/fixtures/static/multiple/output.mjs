const ns1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    get a() {
      return _a;
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })),
  ns2 = Object.freeze(Object.defineProperty({
    __proto__: null,
    get b() {
      return _b;
    }
  }, Symbol.toStringTag, {
    value: "Module"
  }));
import { a as _a } from "x";
import { b as _b } from "y";
console.log(ns1, ns2);
