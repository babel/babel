const [text, json] = await Promise.all([babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "text"), babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "json")]);
