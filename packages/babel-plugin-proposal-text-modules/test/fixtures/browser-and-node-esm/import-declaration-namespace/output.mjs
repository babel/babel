const ns = await (typeof process === "object" && process.versions?.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x")))).then(String) : _processResponse(fetch(import.meta.resolve("./x")), "text")).then(j => ({
  default: j
}));
function _processResponse(t, e, r) { return t.then(t => { if (t.ok) { const s = t[e](); return r ? s.then(r) : s; } throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
