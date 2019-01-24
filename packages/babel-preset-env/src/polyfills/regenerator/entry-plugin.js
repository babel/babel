import { isPolyfillSource, isRequire } from "../../utils";

export default function({ types: t }) {
  const visitor = {
    ImportDeclaration(path) {
      if (
        path.node.specifiers.length === 0 &&
        isPolyfillSource(path.node.source.value)
      ) {
        this.regeneratorImportExcluded = true;
        path.remove();
      }
    },
    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isRequire(t, bodyPath)) {
          this.regeneratorImportExcluded = true;
          path.remove();
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
      const { debug, filename } = this.opts;

      if (debug && this.regeneratorImportExcluded) {
        console.log(
          `\n[${filename}] Based on your targets, regenerator-runtime import excluded.`,
        );
      }
    },
  };
}
