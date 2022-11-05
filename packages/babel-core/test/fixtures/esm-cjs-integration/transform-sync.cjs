/*
 * This test throws an error, because the CJS .transformSync
 * is called before that the ESM version is loaded.
 */

const babel = require("../../../cjs-proxy.cjs");

const out = babel.transformSync("REPLACE_ME;", { configFile: false });
console.log(out.code);
