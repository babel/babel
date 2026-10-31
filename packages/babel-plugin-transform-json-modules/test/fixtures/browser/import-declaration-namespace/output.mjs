const ns = await babelHelpers.processResponse(fetch(import.meta.resolve("./x.json")), "json").then(j => ({
  default: j
}));
