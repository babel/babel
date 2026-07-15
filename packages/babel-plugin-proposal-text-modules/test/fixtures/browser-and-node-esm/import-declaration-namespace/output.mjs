const ns = await (typeof process === "object" && process.versions?.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x")))).then(String) : fetch(import.meta.resolve("./x")).then(r => r.text())).then(j => ({
  default: j
}));
