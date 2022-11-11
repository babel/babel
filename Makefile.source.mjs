import "shelljs/make.js";
import path from "path";
import { execFileSync } from "child_process";
import { writeFileSync } from "fs";

/**
 * @type {import("shelljs")}
 */
const shell = global;
const target = new Proxy(global.target, {
  // eslint-disable-next-line no-unused-vars
  set: function (obj, prop, value) {
    return Reflect.set(...arguments);
  },
  // eslint-disable-next-line no-unused-vars
  get: function (obj, prop, receiver) {
    print(`make ${prop}`);
    return Reflect.get(...arguments);
  },
});
const SOURCES = ["packages", "codemods", "eslint"];

const EslintArgs = [
  "eslint",
  "scripts",
  "benchmark",
  ...SOURCES,
  "*.{js,cjs,mjs,ts}",
  "--format",
  "codeframe",
  "--ext",
  ".js,.cjs,.mjs,.ts",
];

const YARN_PATH = shell.which("yarn").stdout;
const NODE_PATH = process.execPath; // `yarn node` is so slow on Windows

shell.config.verbose = true;

function print(...msgs) {
  console.log.apply(console, msgs);
}

function exec(executable, args, cwd, inheritStdio = true) {
  print(
    `${executable
      .replaceAll(YARN_PATH, "yarn")
      .replaceAll(NODE_PATH, "node")} ${args.join(" ")}`
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
  shell.rm("-rf", ["node_modules", "package-lock.json", ".changelog"]);

  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/package-lock.json`);
  });

  target["clean"]();
  target["clean-lib"]();
};

target["clean"] = function () {
  target["test-clean"]();

  shell.rm("-rf", [
    ".npmrc",
    "coverage",
    "packages/*/npm-debug*",
    "node_modules/.cache",
  ]);
};

target["test-clean"] = function () {
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/test-fixtures.json`);
  });
};

target["clean-lib"] = function () {
  shell.rm(
    "-rf",
    SOURCES.map(source => `${source}/*/lib`)
  );
};

target["clean-runtime-helpers"] = function () {
  shell.rm("-rf", [
    "packages/babel-runtime/helpers/**/*.js",
    "packages/babel-runtime-corejs2/helpers/**/*.js",
    "packages/babel-runtime-corejs3/helpers/**/*.js",
    "packages/babel-runtime/helpers/**/*.mjs",
    "packages/babel-runtime-corejs2/helpers/**/*.mjs",
    "packages/babel-runtime-corejs3/helpers/**/*.mjs",
    "packages/babel-runtime-corejs2/core-js",
  ]);
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
  target["build-no-bundle"]();

  if (process.env.BABEL_COVERAGE != "true") {
    target["build-standalone"]();
  }
};

target["build-standalone"] = function () {
  yarn(["gulp", "build-babel-standalone"]);
};

target["build-bundle"] = function () {
  target["clean"]();
  target["clean-lib"]();

  node(["scripts/set-module-type.js"]);

  yarn(["gulp", "build"]);

  target["build-flow-typings"]();
  target["build-dist"]();
};

target["build-no-bundle"] = function () {
  target["clean"]();
  target["clean-lib"]();

  node(["scripts/set-module-type.js"]);

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

target["prepublish"] = function () {
  target["bootstrap-only"]();

  env(
    () => {
      target["prepublish-build"]();
      target["test"]();
    },
    {
      IS_PUBLISH: "true",
    }
  );

  node(["scripts/set-module-type.js", "clean"]);
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
      NODE_ENV: "production",
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

  // ts doesn't generate declaration files after we remove the output directory by manually when incremental==true
  shell.rm("-rf", "tsconfig.tsbuildinfo");
  shell.rm("-rf", "dts");
  yarn(["tsc", "-b", "."]);
};

target["generate-tsconfig"] = function () {
  node(["scripts/generators/tsconfig.js"]);
  node(["scripts/generators/archived-libs-typings.js"]);
};

target["generate-type-helpers"] = function () {
  yarn(["gulp", "generate-type-helpers"]);
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

target["clone-license"] = function () {
  node(["scripts/clone-license.js"]);
};

/**
 * DEV
 */

target["lint"] = function () {
  env(
    () => {
      yarn(EslintArgs);
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
  yarn([...EslintArgs, "--fix"]);
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

target["test-cov"] = function () {
  target["build"]();

  env(
    () => {
      yarn(["c8", "jest"]);
    },
    {
      BABEL_ENV: "test",
      BABEL_COVERAGE: "true",
    }
  );
};

/**
 * PUBLISH
 */

target["new-version-checklist"] = function () {
  // eslint-disable-next-line no-constant-condition
  if (0) {
    console.log(
      `
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!                                                   !!!!!!
!!!!!!         Write any message that should             !!!!!!
!!!!!!            block the release here                 !!!!!!
!!!!!!                                                   !!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    `.trim()
    );
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

target["new-version"] = function () {
  target["new-version-checklist"]();

  exec("git", ["pull", "--rebase"]);
  yarn(["release-tool", "version", "-f", "@babel/standalone"]);
};

target["new-version"] = function () {
  target["new-version-checklist"]();

  exec("git", ["pull", "--rebase"]);
  yarn(["release-tool", "version", "-f", "@babel/standalone"]);
};
