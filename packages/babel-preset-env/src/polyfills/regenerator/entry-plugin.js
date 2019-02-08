import { isRegeneratorSource, isRegeneratorRequire } from "../../utils";

export default function({ types: t }) {
  const visitor = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isRegeneratorSource(path.node.source.value)
      ) {
        this.regeneratorImportExcluded = true;
        path.remove();
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isRegeneratorRequire(t, bodyPath)) {
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
