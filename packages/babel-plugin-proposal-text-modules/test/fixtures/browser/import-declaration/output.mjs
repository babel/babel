const j = await fetch(import.meta.resolve("./x")).then(r => r.text());
