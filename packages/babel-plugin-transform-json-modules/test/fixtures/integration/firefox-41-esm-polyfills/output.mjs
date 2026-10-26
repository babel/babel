import _Promise from "core-js-pure/stable/promise/index.js";
import _URL from "core-js-pure/stable/url/index.js";
const [j1, j2] = await _Promise.all([_processResponse(fetch(import.meta.resolve?.("./x1.json") ?? new _URL("./x1.json", import.meta.url)), "json"), _processResponse(fetch(import.meta.resolve?.("./x2.json") ?? new _URL("./x2.json", import.meta.url)), "json")]);
function _processResponse(t, e, r) { return t.then(function (t) { if (t.ok) return t = t[e](), r ? t.then(r) : t; throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
