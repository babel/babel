const [j, j2] = await Promise.all([babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "text"), babelHelpers.processResponse(fetch(import.meta.resolve("./x2")), "text")]);
someBody;
