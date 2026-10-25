const j = await _processResponse(fetch(import.meta.resolve?.("./x.json") ?? new URL("./x.json", import.meta.url)), "json");
function _processResponse(t, e, r) { return t.then(t => { if (t.ok) { const s = t[e](); return r ? s.then(r) : s; } throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
