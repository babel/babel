import("x", { exports: ["a"] });
import("x", { "exports": ["a"] });
import("x", { ["exports"]: ["a"] });
import("x", { [key]: ["a"] });
import("x", { ...opts });
import("x", { get exports() { return ["a"]; } });
