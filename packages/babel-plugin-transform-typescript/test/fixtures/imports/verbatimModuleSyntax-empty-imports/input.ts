//! Erased away entirely.
import type { A } from "./a.js";
//! Rewritten to 'import { b } from "bcd";'
import { b, type c, type d } from "./bcd.js";
//! Rewritten to 'import {} from "xyz";' (with inner type-only import)
import { type xyz } from "./xyz.js";
//! Rewritten to 'import {} from "xyz";' (with no named imports)
import {} from "./xyz.js";

let a: A;
let _b = b;
let _c: c;
let _d: d;
let _xyz: xyz;
