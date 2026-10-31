const ns = await babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "text").then(j => ({
  default: j
}));
