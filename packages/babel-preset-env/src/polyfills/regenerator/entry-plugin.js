import { getImportSource, getRequireSource } from "../../utils";

function isRegeneratorSource(source) {
  return source === "regenerator-runtime/runtime";
}

export default function() {
  const visitor = {
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
    name: "regenerator-entry",
    visitor,
    pre() {
      this.regeneratorImportExcluded = false;
    },
    post() {
      if (this.opts.debug && this.regeneratorImportExcluded) {
        console.log(
          `\n[${
            this.file.opts.filename
          }] Based on your targets, regenerator-runtime import excluded.`,
        );
      }
    },
  };
}
