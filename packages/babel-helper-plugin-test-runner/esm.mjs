import _cjs from "./lib/index.js";
const cjs = _cjs.default || _cjs;

const adapter = cjs.bind();

// For backward compatibility with the CJS-only version, this makes
//    import _x from "@babel/helper-plugin-test-runner"
//    const x = _x.default
// still work.
adapter.default = cjs;

export default adapter;
