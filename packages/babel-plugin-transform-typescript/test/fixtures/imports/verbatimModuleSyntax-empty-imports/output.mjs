//! Erased away entirely.

//! Rewritten to 'import { b } from "bcd";'
import { b } from "./bcd.js";
//! Rewritten to 'import {} from "xyz";' (with inner type-only import)
import {} from "./xyz.js";
//! Rewritten to 'import {} from "xyz";' (with no named imports)
import {} from "./xyz.js";
let a;
let _b = b;
let _c;
let _d;
let _xyz;
