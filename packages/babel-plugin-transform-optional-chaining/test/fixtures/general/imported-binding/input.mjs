import { a } from "a";

// No code runs between the nullish check and the access,
// so the import can be read twice.
a?.b;
a?.b();
a?.();
a?.b.c();

// The `b` getter might reassign `a`, so the `this` value must be memoized.
a.b?.();
(a?.b)();
