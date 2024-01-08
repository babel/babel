import "shelljs/make.js";
import path from "path";
import { execFileSync } from "child_process";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import semver from "semver";

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

  // re-generate the necessary lib/package.json files
  node(["scripts/set-module-type.js"]);
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
  node(["scripts/set-module-type.js", "commonjs"]);

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
  if (process.env.BABEL_8_BREAKING) {
    node(["scripts/set-module-type.js", "module"]);
  } else {
    node(["scripts/set-module-type.js", "commonjs"]);
  }

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
      target["build-flow-typings"]();
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

function bootstrapParserTests(name, repoURL, subPaths) {
  function getParserTestsCommit(id) {
    const content = readFileSync("./Makefile", "utf8");
    const commit = content.match(new RegExp(`${id}_COMMIT = (\\w{40})`))[1];
    if (!commit) throw new Error(`Could not find ${id}_COMMIT in Makefile`);
    return commit;
  }

  const dir = "./build/" + name.toLowerCase();

  shell.rm("-rf", dir);
  shell.mkdir("-p", "build");

  exec("git", [
    "clone",
    "--filter=blob:none",
    "--sparse",
    "--single-branch",
    "--shallow-since='2 years ago'",
    repoURL,
    dir,
  ]);

  exec("git", ["sparse-checkout", "set", ...subPaths], dir);
  exec("git", ["checkout", "-q", getParserTestsCommit(name)], dir);
}

target["bootstrap-test262"] = function () {
  bootstrapParserTests("TEST262", "https://github.com/tc39/test262.git", [
    "test",
    "harness",
  ]);
};

target["bootstrap-typescript"] = function () {
  bootstrapParserTests(
    "TYPESCRIPT",
    "https://github.com/microsoft/TypeScript.git",
    ["tests"]
  );
};

target["bootstrap-flow"] = function () {
  bootstrapParserTests("FLOW", "https://github.com/facebook/flow.git", [
    "src/parser/test/flow",
  ]);
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
!!!!!! Write any important message here, and change the  !!!!!!
!!!!!! if (0) above to if (1)                            !!!!!!
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

target["new-babel-8-version"] = function () {
  exec("git", ["pull", "--rebase"]);

  const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
  const nextVersion = semver.inc(pkg.version_babel8, "prerelease");
  pkg.version_babel8 = nextVersion;
  writeFileSync("./package.json", JSON.stringify(pkg, null, 2) + "\n");
  exec("git", ["add", "./package.json"]);
  exec("git", ["commit", "-m", "Bump Babel 8 version to " + nextVersion]);
  exec("git", ["tag", `v${nextVersion}`, "-m", `v${nextVersion}`]);

  return nextVersion;
};

function bumpVersionsToBabel8Pre() {
  const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
  const nextVersion = pkg.version_babel8;

  SOURCES.forEach(source => {
    readdirSync(source).forEach(name => {
      const pkgPath = `${source}/${name}/package.json`;
      if (existsSync(pkgPath)) {
        const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
        if (pkg.peerDependencies?.["@babel/core"]) {
          pkg.peerDependencies["@babel/core"] = `^${nextVersion}`;
        }
        const babel8Condition = pkg.conditions?.["BABEL_8_BREAKING"][0];
        if (babel8Condition?.peerDependencies?.["@babel/core"]) {
          babel8Condition.peerDependencies["@babel/core"] = `^${nextVersion}`;
        }
        if (name === "babel-eslint-plugin") {
          babel8Condition.peerDependencies["@babel/eslint-parser"] =
            `^${nextVersion}`;
        }
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      }
    });
  });

  env(() => yarn(["install"]), {
    YARN_ENABLE_IMMUTABLE_INSTALLS: false,
  });

  return nextVersion;
}

target["new-babel-8-version-create-commit-ci"] = function () {
  const nextVersion = bumpVersionsToBabel8Pre();
  yarn([
    "release-tool",
    "version",
    nextVersion,
    "--all",
    "--tag-version-prefix",
    "tmp.v",
    "--yes",
  ]);
};

target["new-babel-8-version-create-commit"] = function () {
  const nextVersion = bumpVersionsToBabel8Pre();
  exec("git", ["checkout", "-b", `release/temp/v${nextVersion}`]);
  yarn([
    "release-tool",
    "version",
    nextVersion,
    "--all",
    "--tag-version-prefix",
    "tmp.v",
  ]);

  console.log("Run `BABEL_8_BREAKING=true make publish` to finish publishing");
};
