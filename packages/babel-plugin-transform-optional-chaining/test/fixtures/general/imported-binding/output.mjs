var _a$b, _a, _a2;
import { a } from "a";

// No code runs between the nullish check and the access,
// so the import can be read twice.
a === null || a === void 0 || a.b;
a === null || a === void 0 || a.b();
a === null || a === void 0 || a();
a === null || a === void 0 || a.b.c();

// The `b` getter might reassign `a`, so the `this` value must be memoized.
(_a$b = (_a = a).b) === null || _a$b === void 0 || _a$b.call(_a);
(a === null || a === void 0 ? void 0 : (_a2 = a).b.bind(_a2))();
