const ns = await (typeof process === "object" && process.versions?.node ? import("fs").then(fs => fs.promises.readFile(new URL(import.meta.resolve("./x")))).then(_ => String(_).replace(/^\uFEFF/, "")) : babelHelpers.processResponse(fetch(import.meta.resolve("./x")), "text")).then(j => ({
  default: j
}));
