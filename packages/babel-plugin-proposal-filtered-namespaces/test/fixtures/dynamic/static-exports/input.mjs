import("x", { exports: ["b", "a", "B", "a"] });
import("x", { with: { type: "json" }, "exports": [] });
import("x", { ["exports"]: ["c"], with: sideEffect() });

// Not statically known
import("x", { exports: ["a", b] });
import("x", { exports: ["a"], exports: ["b"] });
import("x", { exports });
import("x", { exports: [...names] });
import("x", { exports: ["a"], ...rest });
