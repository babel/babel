const j = await babelHelpers.processResponse(fetch(import.meta.resolve?.("./x.json") ?? new URL("./x.json", import.meta.url)), "json");
