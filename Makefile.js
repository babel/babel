/* global target */

"use strict";

require("shelljs/make");
const { cd, echo, env, exec, exit, mkdir, rm } = require("shelljs");

function setJsonField(filePath, key, value) {
  require("fs").writeFileSync(
    filePath,
    `${JSON.stringify({ ...require(filePath), [key]: value }, null, 2)}\n`
  );
}

const FLOW_COMMIT = "09669846b7a7ca5a6c23c12d56bb3bebdafd67e9";
const TEST262_COMMIT = "8688c4ab79059c3097098605e69f1ee5eda6c409";
const TYPESCRIPT_COMMIT = "038d95144d8b93c2799d1732181c89c3d84362d5";
const FORCE_PUBLISH =
  "@babel/runtime,@babel/runtime-corejs2,@babel/runtime-corejs3,@babel/standalone,@babel/preset-env-standalone";
const SOURCES = ["packages", "codemods", "eslint"];
const YARN = "yarn --silent";
const NODE = `${YARN} node`;

target.build = function() {
  if (env["BABEL_COVERAGE"] !== "true") {
    target.buildStandalone();
  }
};

target.buildBundle = function() {
  target.clean();
  target.cleanLib();
  exec(`${YARN} gulp build`);
  target.generateStandalone();
  target.generateTypeHelpers();
  // call build again as the generated files might need to be compiled again.
  exec(`${YARN} gulp build`);
  target.buildTypings();
  target.buildDist();
};

target.buildBundleCi = function() {
  target.bootstrapOnly();
  target.buildBundle();
};

target.generateStandalone = function() {
  exec(`${NODE} packages/babel-standalone/scripts/generate.js`);
};

target.generateTypeHelpers = function() {
  exec(`${NODE} packages/babel-types/scripts/generateTypeHelpers.js`);
};

target.buildTypings = function() {
  target.buildFlowTypings();
  target.buildTypescriptTypings();
};

target.buildFlowTypings = function() {
  exec(
    `${NODE} packages/babel-types/scripts/generators/flow.js > packages/babel-types/lib/index.js.flow`
  );
};

target.buildTypescriptTypings = function() {
  exec(
    `${NODE} packages/babel-types/scripts/generators/typescript.js > packages/babel-types/lib/index.d.ts`
  );
};

target.buildStandalone = function() {
  target.buildBabelStandalone();
  target.buildPresetEnvStandalone();
};

target.buildStandaloneCi = function() {
  target.buildBundleCi();
  target.buildStandalone();
};

target.buildBabelStandalone = function() {
  exec(`${YARN} gulp build-babel-standalone`);
};

target.buildPresetEnvStandalone = function() {
  exec(`${YARN} gulp build-babel-preset-env-standalone`);
};

target.prepublishBuildStandalone = function() {
  env["BABEL_ENV"] = "production";
  env["IS_PUBLISH"] = "true";
  exec(
    `BABEL_ENV=production IS_PUBLISH=true ${YARN} gulp build-babel-standalone`
  );
};

target.prepublishBuildPresetEnvStandalone = function() {
  env["BABEL_ENV"] = "production";
  env["IS_PUBLISH"] = "true";
  exec(`${YARN} gulp build-babel-preset-env-standalone`);
};

target.buildDist = function() {
  target.buildPolyfillDist();
  target.buildPluginTransformRuntimeDist();
};

target.buildPolyfillDist = function() {
  cd("packages/babel-polyfill");
  exec("scripts/build-dist.sh");
};

target.buildPluginTransformRuntimeDist = function() {
  cd("packages/babel-plugin-transform-runtime");
  exec(`${NODE} scripts/build-dist.js`);
};

target.buildNoBundle = function() {
  target.clean();
  target.cleanLib();
  env["BABEL_ENV"] = "development";
  exec(`${YARN} gulp build-no-bundle`);
  // Ensure that build artifacts for types are created during local
  // development too.
  target.generateTypeHelpers();
  target.buildTypings();
};

target.watch = function() {
  target.buildNoBundle();
  env["BABEL_ENV"] = "development";
  exec(`${YARN} gulp watch`);
};

target.codeQualityCi = function() {
  target.flowCheckCi();
  target.lintCi();
};

target.flowCheckCi = function() {
  target.bootstrapFlowcheck();
  target.flow();
};

target.codeQuality = function() {
  target.flow();
  target.lint();
};

target.flow = function() {
  exec(`${YARN} flow check --strip-root`);
};

target.bootstrapFlowcheck = function() {
  target.bootstrapOnly();
  exec(`${YARN} gulp build-babel-types`);
};

target.lintCi = function() {
  target.lintJsCi();
  target.lintTsCi();
};

target.lintJsCi = function() {
  target.bootstrapOnly();
  target.lintJs();
};

target.lintTsCi = function() {
  target.bootstrapFlowcheck();
  target.lintTs();
};

target.lint = function() {
  target.lintJs();
  target.lintTs();
};

target.lintJs = function() {
  exec(`${YARN} eslint scripts ${SOURCES.join(" ")} --format=codeframe`);
};

target.lintTs = function() {
  const tsFlags = "--strict";
  exec(`${YARN} --silent tsc ${tsFlags} ./packages/babel-types/lib/index.d.ts`);
};

target.fix = function() {
  target.fixJson();
  target.fixJs();
};

target.fixJs = function() {
  echo(
    `${YARN} eslint scripts ${SOURCES.join(
      " "
    )} '*.js' --format=codeframe --fix`
  );
};

target.fixJson = function() {
  exec(
    `${YARN} prettier "{${SOURCES.join(
      ","
    )}}/*/test/fixtures/**/options.json" --write --loglevel warn`
  );
};

target.clean = function() {
  rm("-f", ".npmrc");
  rm("-rf", "packages/babel-polyfill/browser*");
  rm("-rf", "packages/babel-polyfill/dist");
  rm("-rf", "coverage");
  rm("-rf", "packages/*/npm-debug*");
};

target.testClean = function() {
  for (const source in SOURCES) {
    rm("-rf", `${source}/*/test/tmp`);
    rm("-rf", `${source}/*/test-fixtures.json`);
  }
};

target.testOnly = function() {
  let nodeCmd = NODE;
  let jestArgs = "";

  if (env["TEST_DEBUG"]) {
    nodeCmd += ` --inspect-brk`;
    jestArgs += " --runInBand";
  }

  if (env["$CI"]) {
    jestArgs += " --maxWorkers=4 --ci";
  }

  if (env["TEST_GREP"]) {
    jestArgs += ` -t ${env["TEST_GREP"]}`;
  }

  if (env["TEST_ONLY"]) {
    jestArgs += ` (packages|codemods|eslint)/.*${env["TEST_ONLY"]}.*/test`;
  }

  env["BABEL_ENV"] = "test";
  // node_modules/.bin/jest fails on Windows
  exec(`${nodeCmd} node_modules/jest-cli/bin/jest.js ${jestArgs}`);
  target.testClean();
};

target.test = function() {
  target.lint();
  target.testOnly();
};

target.testCi = function() {
  target.jestCi();
};

target.jestCi = function() {
  target.buildStandaloneCi();
  env["BABEL_ENV"] = "test";
  exec(`${YARN} jest --maxWorkers=4 --ci`);
  target.testClean();
};

// Does not work on Windows
target.testCiCoverage = function() {
  env["SHELL"] = "/bin/bash";
  env["BABEL_COVERAGE"] = "true";
  env["BABEL_ENV"] = "test";
  target.bootstrap();
  env["BABEL_ENV"] = "test";
  env["TEST_TYPE"] = "cov";
  exec("./scripts/test-cov.sh");
  exec(
    "bash <(curl -s https://codecov.io/bash) -f coverage/coverage-final.json"
  );
};

target.bootstrapFlow = function() {
  rm("-rf", "build/flow");
  mkdir("-p", "build");
  exec(
    "git clone --branch=master --single-branch --shallow-since=2018-11-01 https://github.com/facebook/flow.git build/flow"
  );
  cd("build/flow") && exec(`git checkout ${FLOW_COMMIT}`);
};

target.testFlow = function() {
  exec(`${NODE} scripts/parser-tests/flow`);
};

target.testFlowCi = function() {
  target.buildBundleCi();
  target.bootstrapFlow();
  target.testFlow();
};

target.testFlowUpdateWhitelist = function() {
  exec(`${NODE} scripts/parser-tests/flow --update-whitelist`);
};

target.bootstrapTypescript = function() {
  rm("-rf", "build/typescript");
  mkdir("-p", "build");
  exec(
    "git clone --branch=master --single-branch --shallow-since=2019-09-01 https://github.com/microsoft/TypeScript.git ./build/typescript"
  );
  cd("build/typescript");
  exec(`git checkout ${TYPESCRIPT_COMMIT}`);
};

target.testTypescript = function() {
  exec(`${NODE} scripts/parser-tests/typescript`);
};

target.testTypescriptCi = function() {
  target.buildBundleCi();
  target.bootstrapTypescript();
  target.testTypescript();
};

target.testTypescriptUpdateWhitelist = function() {
  exec(`${NODE} scripts/parser-tests/typescript --update-whitelist`);
};

target.bootstrapTest262 = function() {
  rm("-rf", "build/test262");
  mkdir("-p", "build");
  exec(
    "git clone --branch=master --single-branch --shallow-since=2019-09-01 https://github.com/tc39/test262.git build/test262"
  );
  cd("build/test262");
  exec(`git checkout ${TEST262_COMMIT}`);
};

target.testTest262 = function() {
  exec(`${NODE} scripts/parser-tests/test262`);
};

target.testTest262Ci = function() {
  target.buildBundleCi();
  target.bootstrapTest262();
  target.testTest262();
};

target.testTest262UpdateWhitelist = function() {
  exec(`${NODE} scripts/parser-tests/test262 --update-whitelist`);
};

// Does not work on Windows
target.cloneLicense = function() {
  exec("./scripts/clone-license.sh");
};

target.prepublishBuild = function() {
  target.cleanLib();
  target.cleanRuntimeHelpers();
  env["NODE_ENV"] = "production";
  env["BABEL_ENV"] = "production";
  target.build();
  target.cloneLicense();
};

target.prepublish = function() {
  target.bootstrapOnly();
  target.prepublishBuild();
  target.test();
};

target.newVersion = function() {
  exec("git pull --rebase");
  exec(`${YARN} lerna version --force-publish=${FORCE_PUBLISH}`);
};

// NOTE: Run make new-version first
target.publish = function() {
  target.prepublish();
  exec(`${YARN} lerna publish from-git`);
  target.clean();
};

target.publishCi = function() {
  target.prepublish();

  if (env["NPM_TOKEN"] !== "") {
    echo(`"//registry.npmjs.org/:_authToken=${env["NPM_TOKEN"]}" > .npmrc`);
  } else {
    echo("Missing NPM_TOKEN env var");
    exit(1);
  }
};

target.publishTest = function() {
  if (env["I_AM_USING_VERDACCIO"] !== "I_AM_SURE") {
    echo("You probably don't know what you are doing");
    exit(1);
  }

  target.prepublishBuild();
  exec(
    `${YARN} lerna version patch --force-publish=${FORCE_PUBLISH}  --no-push --yes --tag-version-prefix="version-e2e-test-"`
  );
  exec(
    `${YARN} lerna publish from-git --registry http://localhost:4873 --yes --tag-version-prefix="version-e2e-test-"`
  );
  target.clean();
};

target.publishEslint = function() {
  const pkg = env["PKG"];
  setJsonField(`./eslint/${pkg}/package.json`, "private", false);
  cd(`eslint/${pkg}`);
  exec("yarn publish");
  setJsonField(`./eslint/${pkg}/package.json`, "private", true);
};

target.bootstrapOnly = function() {
  target.lernaBootstrap();
};

target.yarnInstall = function() {
  target.cleanAll();
  exec("yarn --ignore-engines");
};

target.lernaBootstrap = function() {
  target.yarnInstall();
  // todo: remove `-- -- --ignore-engines` in Babel 8
  exec(`${YARN} lerna bootstrap -- -- --ignore-engines`);
};

target.bootstrap = function() {
  target.bootstrapOnly();
  target.build();
};

target.cleanLib = function() {
  for (const source in SOURCES) {
    // TODO: Don't delete eslint/*/lib when they use src
    if (source === "eslint") {
      continue;
    }

    rm("-rf", `${source}/*/lib`);
  }

  target.clean();
};

target.cleanRuntimeHelpers = function() {
  rm("-f", "packages/babel-runtime/helpers/**/*.js");
  rm("-f", "packages/babel-runtime-corejs2/helpers/**/*.js");
  rm("-f", "packages/babel-runtime-corejs3/helpers/**/*.js");
  rm("-rf", "packages/babel-runtime-corejs2/core-js");
};

target.cleanAll = function() {
  // rm("-rf", "node_modules");
  rm("-rf", "package-lock.json");
  rm("-rf", ".changelog");

  for (const source in SOURCES) {
    // TODO: Don't delete eslint/*/lib when they use src
    if (source === "eslint") {
      continue;
    }

    rm("-rf", `${source}/*/node_modules`);
    rm("-rf", `${source}/*/package-lock.json`);
  }

  target.clean();
};

target.updateEnvCorejsFixture = function() {
  rm("-rf", "packages/babel-preset-env/node_modules/core-js-compat");
  exec(`${YARN} lerna bootstrap`);
  target.buildBundle();
  env["OVERWRITE"] = "true";
  exec(`${YARN} jest packages/babel-preset-env`);
};
