/* eslint-disable import/no-extraneous-dependencies */
import fs from "fs";
import { join } from "path";
import { URL, fileURLToPath } from "url";
import { minify } from "terser";
import { babel, presetTypescript } from "$repo-utils/babel-top-level";
import { gzipSync } from "zlib";
import { IS_BABEL_8 } from "$repo-utils";

const HELPERS_FOLDER = new URL("../src/helpers", import.meta.url);
const IGNORED_FILES = new Set(["package.json", "tsconfig.json"]);

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
  localBindingNames: string[];
  dependencies: Map<string, string>;
  exportBindingAssignments: string[];
  exportPath: string;
  exportName: string;
  importBindingsReferences: string[];
  importPaths: string[];
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
      plugins: [
        /**
         * @type {import("@babel/core").PluginObj}
         */
        {
          visitor: {
            ImportDeclaration(path) {
              const source = path.node.source;
              source.value = source.value
                .replace(/\.ts$/, "")
                .replace(/^\.\//, "");
            },
            FunctionDeclaration(path) {
              if (
                mangleFns &&
                path.node.leadingComments?.find(c =>
                  c.value.includes("@no-mangle")
                )
              ) {
                const name = path.node.id.name;
                if (name) noMangleFns.push(name);
              }
            },
          },
        },
      ],
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

    const metadata = getHelperMetadata(code, helperName);

    const helperStr = `\
  // size: ${code.length}, gzip size: ${gzipSync(code).length}
  ${JSON.stringify(helperName)}: helper(
    ${JSON.stringify(minVersion)},
    ${JSON.stringify(code)},
    {
      globals: ${JSON.stringify(metadata.globals)},
      localBindingNames: ${JSON.stringify(metadata.localBindingNames)},
      dependencies: new Map(${JSON.stringify(Array.from(metadata.dependencies))}),
      exportBindingAssignments: ${JSON.stringify(metadata.exportBindingAssignments)},
      exportPath: ${JSON.stringify(metadata.exportPath)},
      exportName: ${JSON.stringify(metadata.exportName)},
      importBindingsReferences: ${JSON.stringify(metadata.importBindingsReferences)},
      importPaths: ${JSON.stringify(metadata.importPaths)},
    }
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

/**
 * @typedef {Object} HelperMetadata
 * @property {string[]} globals
 * @property {string[]} localBindingNames
 * @property {Map<string, string>} dependencies
 * @property {string[]} exportBindingAssignments
 * @property {string} exportPath
 * @property {string} exportName
 * @property {string[]} importBindingsReferences
 * @property {string[]} importPaths
 */

/**
 * Given a file AST for a given helper, get a bunch of metadata about it so that Babel can quickly render
 * the helper is whatever context it is needed in.
 *
 * @returns {HelperMetadata}
 */
export function getHelperMetadata(code, helperName) {
  const globals = new Set();
  const localBindingNames = new Set();
  // Maps imported identifier -> helper name
  const dependencies = new Map();

  let exportName;
  let exportPath;
  const exportBindingAssignments = [];
  const importPaths = [];
  const importBindingsReferences = [];

  const dependencyVisitor = {
    ImportDeclaration(child) {
      const name = child.node.source.value;
      if (
        child.get("specifiers").length !== 1 ||
        !child.get("specifiers.0").isImportDefaultSpecifier()
      ) {
        throw new Error(
          `Helpers can only import a default value (in ${helperName})`
        );
      }
      dependencies.set(child.node.specifiers[0].local.name, name);
      importPaths.push(makePath(child));
    },
    ExportDefaultDeclaration(child) {
      const decl = child.get("declaration");

      if (!decl.isFunctionDeclaration() || !decl.node.id) {
        throw new Error(
          `Helpers can only export named function declarations (in ${helperName})`
        );
      }

      exportName = decl.node.id.name;
      exportPath = makePath(child);
    },
    ExportAllDeclaration() {
      throw new Error(`Helpers can only export default (in ${helperName})`);
    },
    ExportNamedDeclaration() {
      throw new Error(`Helpers can only export default (in ${helperName})`);
    },
    Statement(child) {
      if (child.isImportDeclaration() || child.isExportDeclaration()) return;

      child.skip();
    },
  };

  const referenceVisitor = {
    Program(path) {
      const bindings = path.scope.getAllBindings();

      Object.keys(bindings).forEach(name => {
        if (name === exportName) return;
        if (dependencies.has(name)) return;

        localBindingNames.add(name);
      });
    },
    ReferencedIdentifier(child) {
      const name = child.node.name;
      const binding = child.scope.getBinding(name);
      if (!binding) {
        if (name !== "arguments" || child.scope.path.isProgram()) {
          globals.add(name);
        }
      } else if (dependencies.has(name)) {
        importBindingsReferences.push(makePath(child));
      }
    },
    AssignmentExpression(child) {
      const left = child.get("left");

      if (!(exportName in left.getBindingIdentifiers())) return;

      if (!left.isIdentifier()) {
        throw new Error(
          `Only simple assignments to exports are allowed in helpers (in ${helperName})`
        );
      }

      const binding = child.scope.getBinding(exportName);

      if (binding?.scope.path.isProgram()) {
        exportBindingAssignments.push(makePath(child));
      }
    },
  };

  babel.transformSync(code, {
    configFile: false,
    babelrc: false,
    plugins: [() => ({ visitor: dependencyVisitor })],
  });
  babel.transformSync(code, {
    configFile: false,
    babelrc: false,
    plugins: [() => ({ visitor: referenceVisitor })],
  });

  if (!exportPath) throw new Error("Helpers must have a default export.");

  // Process these in reverse so that mutating the references does not invalidate any later paths in
  // the list.
  exportBindingAssignments.reverse();

  return {
    globals: Array.from(globals),
    localBindingNames: Array.from(localBindingNames),
    dependencies,
    exportBindingAssignments,
    exportPath,
    exportName,
    importBindingsReferences,
    importPaths,
  };
}

function makePath(path) {
  const parts = [];

  for (; path.parentPath; path = path.parentPath) {
    parts.push(path.key);
    if (path.inList) parts.push(path.listKey);
  }

  return parts.reverse().join(".");
}
