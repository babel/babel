var _a, _a2, _a3, _a4, _a$b, _a5, _a6;
import { a } from "a";

// No code runs between the nullish check and the access,
// so the import can be read twice.
(_a = a) === null || _a === void 0 || _a.b;
(_a2 = a) === null || _a2 === void 0 || _a2.b();
(_a3 = a) === null || _a3 === void 0 || _a3();
(_a4 = a) === null || _a4 === void 0 || _a4.b.c();

// The `b` getter might reassign `a`, so the `this` value must be memoized.
(_a$b = (_a5 = a).b) === null || _a$b === void 0 || _a$b.call(_a5);
((_a6 = a) === null || _a6 === void 0 ? void 0 : _a6.b.bind(_a6))();
