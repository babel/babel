const [j, j2] = await Promise.all([fetch(import.meta.resolve("./x.json")).then(r => r.json()), fetch(import.meta.resolve("./x2.json")).then(r => r.json())]);
someBody;
