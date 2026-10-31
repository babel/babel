const [j, j2] = await Promise.all([babelHelpers.processResponse(fetch(import.meta.resolve("./x.json")), "json"), babelHelpers.processResponse(fetch(import.meta.resolve("./x2.json")), "json")]);
someBody;
