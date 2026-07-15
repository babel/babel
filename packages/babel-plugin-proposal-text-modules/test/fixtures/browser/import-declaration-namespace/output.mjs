const ns = await fetch(import.meta.resolve("./x")).then(r => r.text()).then(j => ({
  default: j
}));
