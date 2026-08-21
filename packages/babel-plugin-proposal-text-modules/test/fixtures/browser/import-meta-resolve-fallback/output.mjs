const j = await fetch(import.meta.resolve?.("./x") ?? new URL("./x", import.meta.url)).then(r => r.text());
