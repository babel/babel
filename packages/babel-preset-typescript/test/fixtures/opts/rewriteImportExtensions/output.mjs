import "./a.js";
import "./a.mjs";
import "./a.cjs";
import "./react.js";
// .mtsx and .ctsx are not valid and should not be transformed.
import "./react.mtsx";
import "./react.ctsx";
import "a-package/file.js";
// Bare import, it's either a node package or remapped by an import map
import "soundcloud.ts";
export * from "./a.js";
export { x } from "./a.mjs";
import("./a.js");
import((a + "").replace(/([\/].*.[mc]?)tsx?$/, "$1js"));
