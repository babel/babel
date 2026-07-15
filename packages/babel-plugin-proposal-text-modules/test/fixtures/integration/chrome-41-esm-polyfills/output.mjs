import _Promise from "core-js-pure/stable/promise/index.js";
import _URL from "core-js-pure/stable/url/index.js";
const [j1, j2] = await _Promise.all([fetch(import.meta.resolve?.("./x1") ?? new _URL("./x1", import.meta.url)).then(r => r.text()), fetch(import.meta.resolve?.("./x2") ?? new _URL("./x2", import.meta.url)).then(r => r.text())]);
