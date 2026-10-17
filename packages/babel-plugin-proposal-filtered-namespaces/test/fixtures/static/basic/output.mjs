const ns = Object.freeze(Object.defineProperty({
  __proto__: null,
  get a() {
    return _a;
  },
  get b() {
    return _b;
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
import { a as _a, b as _b } from "x";
ns.a;
