const ns = await (typeof process === "object" && process.versions?.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x.json")))).then(JSON.parse) : fetch(import.meta.resolve("./x.json")).then(r => r.json())).then(j => ({
  default: j
}));
