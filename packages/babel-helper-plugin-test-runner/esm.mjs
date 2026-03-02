import _cjs from "./lib/index.js";

const adapter = _cjs.default.bind();

// For backward compatibility with the CJS-only version, this makes
//    import _x from "@babel/helper-plugin-test-runner"
//    const x = _x.default
// still work.
adapter.default = _cjs.default;

export default adapter;
