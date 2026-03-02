import _Promise from "core-js-pure/stable/promise/index.js";
import _URL from "core-js-pure/stable/url/index.js";
const [j1, j2] = await _Promise.all([fetch(import.meta.resolve?.("./x1.json") ?? new _URL("./x1.json", import.meta.url)).then(r => r.json()), fetch(import.meta.resolve?.("./x2.json") ?? new _URL("./x2.json", import.meta.url)).then(r => r.json())]);
