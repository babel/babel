const [j, j2] = await Promise.all([_processResponse(fetch(import.meta.resolve("./x.json")), "json"), _processResponse(fetch(import.meta.resolve("./x2.json")), "json")]);
function _processResponse(t, e, r) { return t.then(t => { if (t.ok) { const s = t[e](); return r ? s.then(r) : s; } throw TypeError(`Fetch failed: ${t.status} ${t.statusText}`); }); }
someBody;
