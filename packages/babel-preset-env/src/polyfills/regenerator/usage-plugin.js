// @flow

import { createImport } from "../../utils";
import type { NodePath } from "@babel/traverse";

export default function () {
  return {
    name: "regenerator-usage",
    pre() {
      this.usesRegenerator = false;
    },
    visitor: {
      Function(path: NodePath) {
        const { node } = path;

        if (!this.usesRegenerator && (node.generator || node.async)) {
          this.usesRegenerator = true;
          createImport(path, "regenerator-runtime");
        }
      },
    },
    post() {
      if (this.opts.debug && this.usesRegenerator) {
        let filename = this.file.opts.filename;
        // normalize filename to generate consistent preset-env test fixtures
        if (process.env.BABEL_ENV === "test") {
          filename = filename.replace(/\\/g, "/");
        }
        console.log(
          `\n[${filename}] Based on your code and targets, added regenerator-runtime.`,
        );
      }
    },
  };
}
