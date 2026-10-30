const ns = await (typeof process === "object" && process.versions?.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x")))).then(_ => String(_).replace(/^\uFEFF/, "")) : _processResponse(fetch(import.meta.resolve("./x")), "text")).then(j => ({
  default: j
}));
function _processResponse(t, e, r) { return t.then(function (t) { if (t.ok) return t = t[e](), r ? t.then(r) : t; throw TypeError("Fetch failed: " + t.status + " " + t.statusText); }); }
