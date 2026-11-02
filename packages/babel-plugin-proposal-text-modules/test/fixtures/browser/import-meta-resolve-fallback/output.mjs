const j = await babelHelpers.processResponse(fetch(import.meta.resolve?.("./x") ?? new URL("./x", import.meta.url)), "text");
