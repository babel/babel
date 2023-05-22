import commander from "commander";
import Module from "module";
import { inspect } from "util";
import path from "path";
import repl from "repl";
import * as babel from "@babel/core";
import vm from "vm";
import "core-js/stable/index";
import "regenerator-runtime/runtime";
// @ts-expect-error @babel/register is a CommonJS module
import register from "@babel/register";
import { fileURLToPath } from "url";
import { createRequire } from "module";

import type { PluginAPI, PluginObject } from "@babel/core";

const require = createRequire(import.meta.url);

const program = new commander.Command("babel-node");

function collect(value: unknown, previousValue: string[]): Array<string> {
  // If the user passed the option with no value, like "babel-node file.js --presets", do nothing.
  if (typeof value !== "string") return previousValue;

  const values = value.split(",");

  if (previousValue) {
    previousValue.push(...values);
    return previousValue;
  }
  return values;
}

program.option("-e, --eval [script]", "Evaluate script");
program.option(
  "--no-babelrc",
  "Specify whether or not to use .babelrc and .babelignore files",
);
program.option("-r, --require [module]", "Require module");
program.option("-p, --print [code]", "Evaluate script and print result");
program.option(
  "-o, --only [globs]",
  "A comma-separated list of glob patterns to compile",
  collect,
);
program.option(
  "-i, --ignore [globs]",
  "A comma-separated list of glob patterns to skip compiling",
  collect,
);
program.option(
  "-x, --extensions [extensions]",
  "List of extensions to hook into [.es6,.js,.es,.jsx,.mjs]",
  collect,
);
program.option(
  "--config-file [path]",
  "Path to the babel config file to use. Defaults to working directory babel.config.js",
);
program.option(
  "--env-name [name]",
  "The name of the 'env' to use when loading configs and plugins. " +
    "Defaults to the value of BABEL_ENV, or else NODE_ENV, or else 'development'.",
);
program.option(
  "--root-mode [mode]",
  "The project-root resolution mode. " +
    "One of 'root' (the default), 'upward', or 'upward-optional'.",
);
program.option("-w, --plugins [string]", "", collect);
program.option("-b, --presets [string]", "", collect);

program.version(PACKAGE_JSON.version);
program.usage("[options] [ -e script | script.js ] [arguments]");
program.parse(process.argv);

const babelOptions = {
  caller: {
    name: "@babel/node",
  },
  extensions: program.extensions,
  ignore: program.ignore,
  only: program.only,
  plugins: program.plugins,
  presets: program.presets,
  configFile: program.configFile,
  envName: program.envName,
  rootMode: program.rootMode,

  // Commander will default the "--no-" arguments to true, but we want to
  // leave them undefined so that @babel/core can handle the
  // default-assignment logic on its own.
  babelrc: program.babelrc === true ? undefined : program.babelrc,
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
    VariableDeclaration(path) {
      if (path.node.kind !== "var") {
        throw path.buildCodeFrameError(
          "Only `var` variables are supported in the REPL",
        );
      }
    },

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
    presets: program.presets,
    plugins: (program.plugins || []).concat([replPlugin]),
  }).code;

  return vm.runInThisContext(code, {
    filename: filename,
  });
};

if (program.eval || program.print) {
  let code = program.eval;
  if (!code || code === true) code = program.print;

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
  if (program.print) {
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
        const parsedArg = program[optionName];
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
  if (program.require) {
    require(require.resolve(program.require, {
      paths: [process.cwd()],
    }));
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
