const ns = await fetch(import.meta.resolve("./x.json")).then(r => r.json()).then(j => ({
  default: j
}));
