const [text, json] = await Promise.all([fetch(import.meta.resolve("./x")).then(r => r.text()), fetch(import.meta.resolve("./x")).then(r => r.json())]);
