import { getImportSource, getRequireSource } from "./utils";
import type { Visitor } from "@babel/traverse";

function isRegeneratorSource(source) {
  return (
    source === "regenerator-runtime/runtime" ||
    source === "regenerator-runtime/runtime.js"
  );
}

export default function () {
  const visitor: Visitor<{ regeneratorImportExcluded: boolean }> = {
    ImportDeclaration(path) {
      if (isRegeneratorSource(getImportSource(path))) {
        this.regeneratorImportExcluded = true;
        path.remove();
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isRegeneratorSource(getRequireSource(bodyPath))) {
          this.regeneratorImportExcluded = true;
          bodyPath.remove();
        }
      });
    },
  };

  return {
    name: "preset-env/remove-regenerator",
    visitor,
    pre() {
      this.regeneratorImportExcluded = false;
    },
    post() {
      if (this.opts.debug && this.regeneratorImportExcluded) {
        let filename = this.file.opts.filename;
        // normalize filename to generate consistent preset-env test fixtures
        if (process.env.BABEL_ENV === "test") {
          filename = filename.replace(/\\/g, "/");
        }
        console.log(
          `\n[${filename}] Based on your targets, regenerator-runtime import excluded.`,
        );
      }
    },
  };
}
