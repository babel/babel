// Custom prototypes
import("x", { __proto__: { exports: ["a"] } });
import("x", { "__proto__": { exports: ["a"] } });

// This has a custom prototype, but we statically extract `exports` anyway.
import("x", { __proto__: null, exports: ["a"] });

// This is technically just a __proto__ property, but it's not worth
// making the transform logic more complex to exclude this case. The
// runtime helper will do the right thing anyway.
import("x", { ["__proto__"]: { exports: ["a"] } });
