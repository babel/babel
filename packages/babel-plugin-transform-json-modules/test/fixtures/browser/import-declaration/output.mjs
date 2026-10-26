const j = await _processResponse(fetch(import.meta.resolve("./x.json")), "json");
function _processResponse(t, e, r) { return t.then(function (t) { if (t.ok) return t = t[e](), r ? t.then(r) : t; throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
