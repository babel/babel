// @flow

import corejs2Polyfills from "@babel/compat-data/corejs2-built-ins";
import { filterItems } from "@babel/helper-compilation-targets";
import getPlatformSpecificDefaultFor from "./get-platform-specific-default";
import {
  createImport,
  isPolyfillSource,
  getImportSource,
  getRequireSource,
} from "../../utils";
import { logEntryPolyfills } from "../../debug";

import type { InternalPluginOptions } from "../../types";
import type { NodePath } from "@babel/traverse";

export default function (
  _: any,
  {
    include,
    exclude,
    polyfillTargets,
    regenerator,
    debug,
  }: InternalPluginOptions,
) {
  const polyfills = filterItems(
    corejs2Polyfills,
    include,
    exclude,
    polyfillTargets,
    getPlatformSpecificDefaultFor(polyfillTargets),
  );

  const isPolyfillImport = {
    ImportDeclaration(path: NodePath) {
      if (isPolyfillSource(getImportSource(path))) {
        this.replaceBySeparateModulesImport(path);
      }
    },
    Program(path: NodePath) {
      path.get("body").forEach(bodyPath => {
        if (isPolyfillSource(getRequireSource(bodyPath))) {
          this.replaceBySeparateModulesImport(bodyPath);
        }
      });
    },
  };

  return {
    name: "corejs2-entry",
    visitor: isPolyfillImport,
    pre() {
      this.importPolyfillIncluded = false;

      this.replaceBySeparateModulesImport = function (path) {
        this.importPolyfillIncluded = true;

        if (regenerator) {
          createImport(path, "regenerator-runtime");
        }

        const modules = Array.from(polyfills).reverse();

        for (const module of modules) {
          createImport(path, module);
        }

        path.remove();
      };
    },
    post() {
      if (debug) {
        logEntryPolyfills(
          "@babel/polyfill",
          this.importPolyfillIncluded,
          polyfills,
          this.file.opts.filename,
          polyfillTargets,
          corejs2Polyfills,
        );
      }
    },
  };
}
