const [j, j2] = await Promise.all([fetch(import.meta.resolve("./x")).then(r => r.text()), fetch(import.meta.resolve("./x2")).then(r => r.text())]);
someBody;
