import { createImport } from "../../utils";

export default function() {
  return {
    name: "regenerator-usage",
    pre() {
      this.usesRegenerator = false;
    },
    visitor: {
      Function(path) {
        const { node } = path;

        if (!this.usesRegenerator && (node.generator || node.async)) {
          this.usesRegenerator = true;
          createImport(path, "regenerator-runtime");
        }
      },
    },
    post() {
      if (this.opts.debug && this.usesRegenerator) {
        console.log(
          `\n[${
            this.file.opts.filename
          }] Based on your code and targets, added regenerator-runtime.`,
        );
      }
    },
  };
}
