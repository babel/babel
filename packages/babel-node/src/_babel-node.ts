import Module from "module";
import { inspect } from "util";
import path from "path";
import repl from "repl";
import * as babel from "@babel/core";
import vm from "vm";
import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
// @ts-expect-error @babel/register is a CommonJS module
import register from "@babel/register";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import type { PluginAPI, PluginObject } from "@babel/core";

import { program } from "./program-setup.ts";

const require = createRequire(import.meta.url);

program.parse(process.argv);
const opts = program.opts();

const babelOptions = {
  caller: {
    name: "@babel/node",
  },
  extensions: opts.extensions,
  ignore: opts.ignore,
  only: opts.only,
  plugins: opts.plugins,
  presets: opts.presets,
  configFile: opts.configFile,
  envName: opts.envName,
  rootMode: opts.rootMode,

  // Commander will default the "--no-" arguments to true, but we want to
  // leave them undefined so that @babel/core can handle the
  // default-assignment logic on its own.
  babelrc: opts.babelrc === true ? undefined : opts.babelrc,
};

for (const key of Object.keys(babelOptions) as Array<
  keyof typeof babelOptions
>) {
  if (babelOptions[key] === undefined) {
    delete babelOptions[key];
  }
}

register(babelOptions);

const replPlugin = ({ types: t }: PluginAPI): PluginObject => ({
  visitor: {
    Program(path) {
      let hasExpressionStatement: boolean;
      for (const bodyPath of path.get("body")) {
        if (bodyPath.isExpressionStatement()) {
          hasExpressionStatement = true;
        } else if (
          bodyPath.isExportDeclaration() ||
          bodyPath.isImportDeclaration()
        ) {
          throw bodyPath.buildCodeFrameError(
            "Modules aren't supported in the REPL",
          );
        }
      }
      if (hasExpressionStatement) return;

      // If the executed code doesn't evaluate to a value,
      // prevent implicit strict mode from printing 'use strict'.
      path.pushContainer(
        "body",
        t.expressionStatement(t.identifier("undefined")),
      );
    },
  },
});

const _eval = function (code: string, filename: string) {
  code = code.trim();
  if (!code) return undefined;

  code = babel.transformSync(code, {
    filename: filename,
    ...babelOptions,
    plugins: (opts.plugins || []).concat([replPlugin]),
  }).code;

  return vm.runInThisContext(code, {
    filename: filename,
  });
};

if (opts.eval || opts.print) {
  let code = opts.eval;
  if (!code || code === true) code = opts.print;

  global.__filename = "[eval]";
  global.__dirname = process.cwd();

  const module = new Module(global.__filename);
  module.filename = global.__filename;
  // @ts-expect-error todo(flow->ts)
  module.paths = Module._nodeModulePaths(global.__dirname);

  global.exports = module.exports;
  global.module = module;
  global.require = module.require.bind(module);

  const result = _eval(code, global.__filename);
  if (opts.print) {
    const output = typeof result === "string" ? result : inspect(result);
    process.stdout.write(output + "\n");
  }
} else {
  if (program.args.length) {
    // slice all arguments up to the first filename since they're babel args that we handle
    let args = process.argv.slice(2);

    let i = 0;
    let ignoreNext = false;
    args.some(function (arg, i2) {
      if (ignoreNext) {
        ignoreNext = false;
        return;
      }

      if (arg[0] === "-") {
        const parsedOption = program.options.find((option: any) => {
          return option.long === arg || option.short === arg;
        });
        if (parsedOption === undefined) {
          return;
        }
        const optionName = parsedOption.attributeName();
        const parsedArg = opts[optionName];
        if (optionName === "require" || (parsedArg && parsedArg !== true)) {
          ignoreNext = true;
        }
      } else {
        i = i2;
        return true;
      }
    });
    args = args.slice(i);

    requireArgs();

    // make the filename absolute
    const filename = args[0];
    if (!path.isAbsolute(filename)) {
      args[0] = path.join(process.cwd(), filename);
    }

    // add back on node and concat the sliced args
    process.argv = ["node", ...args];
    process.execArgv.push(fileURLToPath(import.meta.url));

    Module.runMain();
  } else {
    requireArgs();
    replStart();
  }
}

// We have to handle require ourselves, as we want to require it in the context of babel-register
function requireArgs() {
  if (opts.require) {
    require(
      require.resolve(opts.require, {
        paths: [process.cwd()],
      }),
    );
  }
}
function replEval(
  this: repl.REPLServer,
  code: string,
  context: vm.Context,
  filename: string,
  callback: (err: Error | null, result: any) => void,
) {
  let err;
  let result;

  try {
    if (code[0] === "(" && code[code.length - 1] === ")") {
      code = code.slice(1, -1); // remove "(" and ")"
    }

    result = _eval(code, filename);
  } catch (e) {
    err = e;
  }

  callback(err, result);
}

function replStart() {
  const replServer = repl.start({
    prompt: "babel > ",
    input: process.stdin,
    output: process.stdout,
    eval: replEval,
    useGlobal: true,
    preview: true,
  });
  const NODE_REPL_HISTORY = process.env.NODE_REPL_HISTORY;
  if (process.env.BABEL_8_BREAKING) {
    replServer.setupHistory(NODE_REPL_HISTORY, () => {});
  } else {
    replServer.setupHistory?.(NODE_REPL_HISTORY, () => {});
  }
}
