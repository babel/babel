import "./a.ts";
import "./a.mts";
import "./a.cts";
import "./react.tsx";
// .mtsx and .ctsx are not valid and should not be transformed.
import "./react.mtsx";
import "./react.ctsx";
import "a-package/file.ts";
// Bare import, it's either a node package or remapped by an import map
import "soundcloud.ts";

export * from "./a.ts";
export {x} from "./a.mts";

import("./a.ts");
import(a);
