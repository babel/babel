// @flow

import corejs2Polyfills from "../../../data/corejs2-built-ins.json";
import getPlatformSpecificDefaultFor from "./get-platform-specific-default";
import filterItems from "../../filter-items";
import {
  createImport,
  isPolyfillSource,
  getImportSource,
  getRequireSource,
} from "../../utils";
import { logEntryPolyfills } from "../../debug";

import type { InternalPluginOptions } from "../../types";
import type { NodePath } from "@babel/traverse";

export default function(
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
    Program(path: NodePath) {
      path.get("body").forEach(bodyPath => {
        const source = bodyPath.isImportDeclaration()
          ? getImportSource(bodyPath)
          : getRequireSource(bodyPath);
        if (isPolyfillSource(source)) {
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

      this.replaceBySeparateModulesImport = function(path) {
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
