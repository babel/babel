import { createImport } from "../../utils";
import { logUsageRegenerator } from "../../debug";

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
      const { debug } = this.opts;

      if (debug) {
        logUsageRegenerator(this.usesRegenerator, this.file.opts.filename);
      }
    },
  };
}
