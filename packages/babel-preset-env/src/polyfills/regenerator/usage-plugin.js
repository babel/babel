import { createImport } from "../../utils";
import { logUsageRegenerator } from "../../debug";

export default function() {
  return {
    name: "regenerator-usage",
    pre() {
      this.usesRegenerator = false;
    },
    visitor: {
      Function(path, state) {
        const { node } = path;

        if (!this.usesRegenerator && (node.generator || node.async)) {
          this.usesRegenerator = true;
          if (state.opts.regenerator) {
            createImport(path, "regenerator-runtime");
          }
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
