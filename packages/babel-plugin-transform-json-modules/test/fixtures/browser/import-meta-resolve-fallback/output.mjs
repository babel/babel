const j = await fetch(import.meta.resolve?.("./x.json") ?? new URL("./x.json", import.meta.url)).then(r => r.json());
