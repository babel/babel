import "shelljs/make.js";
import path from "path";
import { execFileSync } from "child_process";
import { writeFileSync } from "fs";

/**
 * @type {import("shelljs")}
 */
const shell = global;
const target = global.target;

const SOURCES = ["packages", "codemods", "eslint"];

const YARN_PATH = shell.which("yarn").stdout;
const NODE_PATH = process.execPath; // `yarn node` is so slow on Windows

shell.config.verbose = true;

function print(msg) {
  console.log(msg);
}

function exec(executable, args, cwd, inheritStdio = true) {
  print(
    `${(executable.replaceAll(YARN_PATH), "yarn").replaceAll(
      NODE_PATH,
      "node"
    )} ${args.join(" ")}`
  );

  try {
    return execFileSync(executable, args, {
      stdio: inheritStdio ? "inherit" : undefined,
      cwd: cwd && path.resolve(cwd),
      env: process.env,
    });
  } catch (error) {
    if (inheritStdio && error.status != 0) {
      console.error(
        new Error(
          `\ncommand: ${executable} ${args.join(" ")}\ncode: ${error.status}`
        )
      );
      // eslint-disable-next-line no-process-exit
      process.exit(error.status);
    }
    throw error;
  }
}

function yarn(args, cwd, inheritStdio) {
  return exec(YARN_PATH, args, cwd, inheritStdio);
}

function node(args, cwd, inheritStdio) {
  return exec(NODE_PATH, args, cwd, inheritStdio);
}

function env(fun, env) {
  const envBak = process.env;
  process.env = { ...envBak, ...env };
  fun();
  process.env = envBak;
}

/**
 * CLEAN
 */

target["clean-all"] = function () {
  ["node_modules", "package-lock.json", ".changelog"].forEach(path => {
    shell.rm("-rf", path);
  });

  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/package-lock.json`);
  });

  target["clean"]();
  target["clean-lib"]();
};

target["clean"] = function () {
  target["test-clean"]();

  [
    ".npmrc",
    "coverage",
    "packages/*/npm-debug*",
    "node_modules/.cache",
  ].forEach(path => {
    shell.rm("-rf", path);
  });
};

target["test-clean"] = function () {
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/test-fixtures.json`);
  });
};

target["clean-lib"] = function () {
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/lib`);
  });
};

target["clean-runtime-helpers"] = function () {
  [
    "packages/babel-runtime/helpers/**/*.js",
    "packages/babel-runtime-corejs2/helpers/**/*.js",
    "packages/babel-runtime-corejs3/helpers/**/*.js",
    "packages/babel-runtime/helpers/**/*.mjs",
    "packages/babel-runtime-corejs2/helpers/**/*.mjs",
    "packages/babel-runtime-corejs3/helpers/**/*.mjs",
    "packages/babel-runtime-corejs2/core-js",
  ].forEach(path => {
    shell.rm("-rf", path);
  });
};

/**
 * BUILD
 */

target["use-cjs"] = function () {
  node(["scripts/set-module-type.js", "script"]);

  target["bootstrap"]();
};

target["use-esm"] = function () {
  node(["scripts/set-module-type.js", "module"]);

  target["bootstrap"]();
};

target["bootstrap-only"] = function () {
  target["clean-all"]();

  yarn(["install"]);
};

target["bootstrap"] = function () {
  target["bootstrap-only"]();

  target["generate-tsconfig"]();
  target["build"]();
};

target["build"] = function () {
  target["build-bundle"]();

  if (process.env.BABEL_COVERAGE != "true") {
    target["build-standalone"]();
  }
};

target["build-standalone"] = function () {
  yarn(["gulp", "build-babel-standalone"]);
};

target["build-bundle"] = function () {
  node(["scripts/set-module-type.js"]);

  target["clean"]();
  target["clean-lib"]();

  yarn(["gulp", "build"]);

  target["build-flow-typings"]();
  target["build-dist"]();
};

target["build-no-bundle"] = function () {
  node(["scripts/set-module-type.js"]);

  target["clean"]();
  target["clean-lib"]();

  env(
    () => {
      yarn(["gulp", "build-dev"]);
    },
    { BABEL_ENV: "development" }
  );

  target["build-flow-typings"]();
  target["build-dist"]();
};

target["build-flow-typings"] = function () {
  writeFileSync(
    "packages/babel-types/lib/index.js.flow",
    node(["packages/babel-types/scripts/generators/flow.js"], undefined, false)
  );
};

target["build-dist"] = function () {
  target["build-plugin-transform-runtime-dist"]();
};

target["build-plugin-transform-runtime-dist"] = function () {
  node(["scripts/build-dist.js"], "packages/babel-plugin-transform-runtime");
};

target["prepublish-build"] = function () {
  target["clean-lib"]();
  target["clean-runtime-helpers"]();

  env(
    () => {
      target["build-bundle"]();
    },
    {
      NODE_ENV: "production",
      BABEL_ENV: "production",
      STRIP_BABEL_8_FLAG: "true",
    }
  );

  env(
    () => {
      target["prepublish-build-standalone"]();
      target["clone-license"]();
      target["prepublish-prepare-dts"]();
    },
    {
      STRIP_BABEL_8_FLAG: "true",
    }
  );
};

target["prepublish-build-standalone"] = function () {
  env(
    () => {
      target["build-standalone"]();
    },
    {
      BABEL_ENV: "production",
      IS_PUBLISH: "true",
    }
  );
};

target["prepublish-prepare-dts"] = function () {
  target["tscheck"]();

  yarn(["gulp", "bundle-dts"]);

  target["build-typescript-legacy-typings"]();
};

target["tscheck"] = function () {
  target["generate-tsconfig"]();

  shell.rm("-rf", "dts");
  yarn(["tsc", "-b", "."]);
};

target["generate-tsconfig"] = function () {
  node(["scripts/generators/tsconfig.js"]);
  node(["scripts/generators/archived-libs-typings.js"]);
};

target["clone-license"] = function () {
  node(["scripts/clone-license.js"]);
};

target["build-typescript-legacy-typings"] = function () {
  writeFileSync(
    "packages/babel-types/lib/index-legacy.d.ts",
    node(
      ["packages/babel-types/scripts/generators/typescript-legacy.js"],
      undefined,
      false
    )
  );
};

/**
 * DEV
 */

target["lint"] = function () {
  env(
    () => {
      yarn([
        "eslint",
        "scripts",
        "benchmark",
        ...SOURCES,
        "*.{js,cjs,mjs,ts}",
        "--format",
        "codeframe",
        "--ext",
        ".js,.cjs,.mjs,.ts",
      ]);
    },
    {
      BABEL_ENV: "test",
    }
  );
};

target["fix"] = function () {
  target["fix-json"]();
  target["fix-js"]();
};

target["fix-js"] = function () {
  yarn([
    "eslint",
    "scripts",
    "benchmark",
    ...SOURCES,
    "*.{js,cjs,mjs,ts}",
    "--format",
    "codeframe",
    "--ext",
    ".js,.cjs,.mjs,.ts",
    "--fix",
  ]);
};

target["fix-json"] = function () {
  yarn([
    "prettier",
    `{${SOURCES.join(",")}}/*/test/fixtures/**/options.json`,
    "--write",
    "--loglevel",
    "warn",
  ]);
};

target["watch"] = function () {
  target["build-no-bundle"]();

  env(
    () => {
      yarn(["gulp", "watch"]);
    },
    {
      BABEL_ENV: "development",
      WATCH_SKIP_BUILD: "true",
    }
  );
};

target["test"] = function () {
  target["lint"]();
  target["test-only"]();
};

target["test-only"] = function (args = []) {
  yarn(["jest", ...args]);
};
