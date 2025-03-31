/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import { join } from "path";
import { URL, fileURLToPath } from "url";
import { minify } from "terser";
import { babel, presetTypescript } from "$repo-utils/babel-top-level";
import { IS_BABEL_8 } from "$repo-utils";
import { gzipSync } from "zlib";

import {
  getHelperMetadata,
  stringifyMetadata,
} from "./build-helper-metadata.js";

const HELPERS_FOLDER = new URL("../src/helpers", import.meta.url);
const IGNORED_FILES = new Set(["package.json", "tsconfig.json"]);

/**
 * Generate Babel plugin for helpers processing
 * The plugin will
 * - rewrite relative imports to other helpers and remove .ts extension
 * - collect function names to `noMangleFns` if `mangleFns` is `true`.
 * @param {boolean} mangleFns Whether the function names in the helper should be mangled
 * @param {string[]} noMangleFns A list of function names that should not be mangled
 * @returns
 */
function BabelPluginProcessHelpersFactory(mangleFns, noMangleFns) {
  /**
   * @param {import("@babel/core").PluginAPI} api
   * @returns {import("@babel/core").PluginObject}
   */
  return function BabelPluginProcessHelpers({ types: t }) {
    /**
     * @type {import("@babel/core").PluginObject}
     */
    const pluginObj = {
      pre: undefined,
      post: undefined,
      visitor: {
        ImportDeclaration(path) {
          const source = path.node.source;
          source.value = source.value.replace(/(^\.\/|\.ts$)/g, "");
        },
        FunctionDeclaration: mangleFns
          ? path => {
              if (
                path.node.leadingComments?.find(c =>
                  c.value.includes("@no-mangle")
                )
              ) {
                const name = path.node.id.name;
                if (name) noMangleFns.push(name);
              }
            }
          : () => {},
      },
    };
    if (!IS_BABEL_8() && process.env.IS_BABEL_OLD_E2E) {
      // These pre/post hooks are needed because the TS transform is,
      // when building in the old Babel e2e test, removing the
      // `export { OverloadYield as default }` in the OverloadYield helper.
      pluginObj.pre = file => {
        file.metadata.exportName = null;
        file.path.traverse({
          ExportSpecifier(path) {
            if (path.node.exported.name === "default") {
              file.metadata.exportName = path.node.local.name;
            }
          },
        });
      };
      pluginObj.post = file => {
        if (!process.env.IS_BABEL_OLD_E2E) return;
        if (!file.metadata.exportName) return;
        file.path.traverse({
          ExportNamedDeclaration(path) {
            if (!path.node.declaration && path.node.specifiers.length === 0) {
              path.node.specifiers.push(
                t.exportSpecifier(
                  t.identifier(file.metadata.exportName),
                  t.identifier("default")
                )
              );
            }
          },
        });
      };
    }
    return pluginObj;
  };
}
export default async function generateHelpers() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'yarn gulp generate-runtime-helpers'
 */

import template from "@babel/template";
import type * as t from "@babel/types";

interface Helper {
  minVersion: string;
  ast: () => t.Program;
  metadata: HelperMetadata;
}

export interface HelperMetadata {
  globals: string[];
  locals: { [name: string]: string[] };
  dependencies: { [name: string]: string[] };
  exportBindingAssignments: string[];
  exportName: string;
}

function helper(minVersion: string, source: string, metadata: HelperMetadata): Helper {
  return Object.freeze({
    minVersion,
    ast: () => template.program.ast(source, { preserveComments: true }),
    metadata,
  })
}

export { helpers as default };
const helpers: Record<string, Helper> = {
  __proto__: null,
`;

  let babel7extraOutput = "";

  for (const file of (await fs.promises.readdir(HELPERS_FOLDER)).sort()) {
    if (IGNORED_FILES.has(file)) continue;
    if (file.startsWith(".")) continue; // ignore e.g. vim swap files

    const [helperName] = file.split(".");

    const isTs = file.endsWith(".ts");

    const filePath = join(fileURLToPath(HELPERS_FOLDER), file);
    if (!file.endsWith(".js") && !isTs) {
      console.error("ignoring", filePath);
      continue;
    }

    let code = await fs.promises.readFile(filePath, "utf8");
    const minVersionMatch = code.match(
      /^\s*\/\*\s*@minVersion\s+(?<minVersion>\S+)\s*\*\/\s*$/m
    );
    if (!minVersionMatch) {
      throw new Error(`@minVersion number missing in ${filePath}`);
    }
    const { minVersion } = minVersionMatch.groups;

    const onlyBabel7 = code.includes("@onlyBabel7");
    const mangleFns = code.includes("@mangleFns");
    const noMangleFns = [];

    code = babel.transformSync(code, {
      configFile: false,
      babelrc: false,
      filename: filePath,
      presets: [
        [
          presetTypescript,
          {
            onlyRemoveTypeImports: true,
            optimizeConstEnums: true,
          },
        ],
      ],
      plugins: [BabelPluginProcessHelpersFactory(mangleFns, noMangleFns)],
    }).code;
    code = (
      await minify(code, {
        ecma: 5,
        mangle: {
          keep_fnames: mangleFns ? new RegExp(noMangleFns.join("|")) : true,
        },
        // The _typeof helper has a custom directive that we must keep
        compress: {
          directives: false,
          passes: 10,
          unsafe: true,
          unsafe_proto: true,
        },
      })
    ).code;

    let metadata;
    // eslint-disable-next-line prefer-const
    [code, metadata] = getHelperMetadata(babel, code, helperName);

    const helperStr = `\
  // size: ${code.length}, gzip size: ${gzipSync(code).length}
  ${JSON.stringify(helperName)}: helper(
    ${JSON.stringify(minVersion)},
    ${JSON.stringify(code)},
    ${stringifyMetadata(metadata)}
  ),
`;

    if (onlyBabel7) {
      if (!IS_BABEL_8()) babel7extraOutput += helperStr;
    } else {
      output += helperStr;
    }
  }

  output += "};";

  if (babel7extraOutput) {
    output += `

if (!process.env.BABEL_8_BREAKING) {
  Object.assign(helpers, {
    ${babel7extraOutput}
  });
}
`;
  }

  return output;
}
