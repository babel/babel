// @flow

import corejs3Polyfills from "core-js-compat/data";
import corejsEntries from "core-js-compat/entries";
import getModulesListForTargetVersion from "core-js-compat/get-modules-list-for-target-version";
import { filterItems } from "@babel/helper-compilation-targets";
import {
  has,
  intersection,
  createImport,
  getImportSource,
  getRequireSource,
  getModulePath,
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

export default function (
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

  const available = new Set(getModulesListForTargetVersion(corejs.version));

  function shouldReplace(source, modules) {
    if (!modules) return false;
    if (
      // Don't replace an import with itself to avoid an infinite loop
      modules.length === 1 &&
      polyfills.has(modules[0]) &&
      available.has(modules[0]) &&
      getModulePath(modules[0]) === source
    ) {
      return false;
    }
    return true;
  }

  const isPolyfillImport = {
    ImportDeclaration(path: NodePath) {
      const source = getImportSource(path);
      if (!source) return;
      if (isBabelPolyfillSource(source)) {
        console.warn(BABEL_POLYFILL_DEPRECATION);
      } else {
        const modules = isCoreJSSource(source);
        if (shouldReplace(source, modules)) {
          this.replaceBySeparateModulesImport(path, modules);
        }
      }
    },
    Program: {
      enter(path: NodePath) {
        path.get("body").forEach(bodyPath => {
          const source = getRequireSource(bodyPath);
          if (!source) return;
          if (isBabelPolyfillSource(source)) {
            console.warn(BABEL_POLYFILL_DEPRECATION);
          } else {
            const modules = isCoreJSSource(source);
            if (shouldReplace(source, modules)) {
              this.replaceBySeparateModulesImport(bodyPath, modules);
            }
          }
        });
      },
      exit(path: NodePath) {
        const filtered = intersection(polyfills, this.polyfillsSet, available);
        const reversed = Array.from(filtered).reverse();

        for (const module of reversed) {
          // Program:exit could be called multiple times.
          // Avoid injecting the polyfills twice.
          if (!this.injectedPolyfills.has(module)) {
            createImport(path, module);
          }
        }

        filtered.forEach(module => this.injectedPolyfills.add(module));
      },
    },
  };

  return {
    name: "corejs3-entry",
    visitor: isPolyfillImport,
    pre() {
      this.injectedPolyfills = new Set();
      this.polyfillsSet = new Set();

      this.replaceBySeparateModulesImport = function (path, modules) {
        for (const module of modules) {
          this.polyfillsSet.add(module);
        }

        path.remove();
      };
    },
    post() {
      if (debug) {
        logEntryPolyfills(
          "core-js",
          this.injectedPolyfills.size > 0,
          this.injectedPolyfills,
          this.file.opts.filename,
          polyfillTargets,
          corejs3Polyfills,
        );
      }
    },
  };
}
