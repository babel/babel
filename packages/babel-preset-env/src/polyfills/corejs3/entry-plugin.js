// @flow

import corejs3Polyfills from "../../../data/corejs3-built-ins.json";
import corejsEntries from "../../../data/corejs3-entries.json";
import getSupportedPolyfills from "./get-supported-polyfills";
import filterItems from "../../filter-items";
import {
  has,
  intersection,
  createImport,
  getImportSource,
  getRequireSource,
} from "../../utils";
import { logEntryPolyfills } from "../../debug";

import type { InternalPluginOptions } from "../../types";
import type { NodePath } from "@babel/traverse";

function isBabelPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "babel-polyfill";
}

function isCoreJSSource(source) {
  if (typeof source === "string") {
    source = source
      .replace(/\\/g, "/")
      .replace(/(\/(index)?)?(\.js)?$/i, "")
      .toLowerCase();
  }
  return has(corejsEntries, source) && corejsEntries[source];
}

const BABEL_POLYFILL_DEPRECATION = `
  \`@babel/polyfill\` is deprecated. Please, use required parts of \`core-js\`
  and \`regenerator-runtime/runtime\` separately`;

export default function(
  _: any,
  { corejs, include, exclude, polyfillTargets, debug }: InternalPluginOptions,
) {
  const polyfills = filterItems(
    corejs3Polyfills,
    include,
    exclude,
    polyfillTargets,
    null,
  );

  const available = getSupportedPolyfills(corejs.version);

  const isPolyfillImport = {
    ImportDeclaration(path: NodePath) {
      const source = getImportSource(path);
      if (!source) return;
      if (isBabelPolyfillSource(source)) {
        console.warn(BABEL_POLYFILL_DEPRECATION);
      } else {
        const modules = isCoreJSSource(source);
        if (modules) {
          this.replaceBySeparateModulesImport(path, modules);
        }
      }
    },
    Program(path: NodePath) {
      path.get("body").forEach(bodyPath => {
        const source = getRequireSource(bodyPath);
        if (!source) return;
        if (isBabelPolyfillSource(source)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const modules = isCoreJSSource(source);
          if (modules) {
            this.replaceBySeparateModulesImport(bodyPath, modules);
          }
        }
      });
    },
  };

  return {
    name: "corejs3-entry",
    visitor: isPolyfillImport,
    pre() {
      this.polyfillsSet = new Set();

      this.replaceBySeparateModulesImport = function(path, modules) {
        for (const module of modules) {
          this.polyfillsSet.add(module);
        }

        path.remove();
      };
    },
    post({ path }: { path: NodePath }) {
      const filtered = intersection(polyfills, this.polyfillsSet, available);
      const reversed = Array.from(filtered).reverse();

      for (const module of reversed) {
        createImport(path, module);
      }

      if (debug) {
        logEntryPolyfills(
          "core-js",
          this.polyfillsSet.size > 0,
          filtered,
          this.file.opts.filename,
          polyfillTargets,
          corejs3Polyfills,
        );
      }
    },
  };
}
