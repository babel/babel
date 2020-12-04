"use strict";

const plumber = require("gulp-plumber");
const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const fancyLog = require("fancy-log");
const filter = require("gulp-filter");
const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const rollup = require("rollup");
const rollupBabel = require("@rollup/plugin-babel").default;
const rollupBabelSource = require("./scripts/rollup-plugin-babel-source");
const rollupCommonJs = require("@rollup/plugin-commonjs");
const rollupJson = require("@rollup/plugin-json");
const rollupNodePolyfills = require("rollup-plugin-node-polyfills");
const rollupNodeResolve = require("@rollup/plugin-node-resolve").default;
const rollupReplace = require("@rollup/plugin-replace");
const { terser: rollupTerser } = require("rollup-plugin-terser");

const defaultSourcesGlob = "./@(codemods|packages|eslint)/*/src/**/*.{js,ts}";

/**
 * map source code path to the generated artifacts path
 * @example
 * mapSrcToLib("packages/babel-core/src/index.js")
 * // returns "packages/babel-core/lib/index.js"
 * @example
 * mapSrcToLib("packages/babel-template/src/index.ts")
 * // returns "packages/babel-template/lib/index.js"
 * @param {string} srcPath
 * @returns {string}
 */
function mapSrcToLib(srcPath) {
  const parts = srcPath.replace(/\.ts$/, ".js").split(path.sep);
  parts[2] = "lib";
  return parts.join(path.sep);
}

function getIndexFromPackage(name) {
  try {
    fs.statSync(`./${name}/src/index.ts`);
    return `${name}/src/index.ts`;
  } catch {
    return `${name}/src/index.js`;
  }
}

function compilationLogger() {
  return through.obj(function (file, enc, callback) {
    fancyLog(`Compiling '${chalk.cyan(file.relative)}'...`);
    callback(null, file);
  });
}

function errorsLogger() {
  return plumber({
    errorHandler(err) {
      fancyLog(err.stack);
    },
  });
}

function rename(fn) {
  return through.obj(function (file, enc, callback) {
    file.path = fn(file);
    callback(null, file);
  });
}

function buildBabel(exclude, sourcesGlob = defaultSourcesGlob) {
  const base = __dirname;

  let stream = gulp.src(sourcesGlob, { base: __dirname });

  if (exclude) {
    const filters = exclude.map(p => `!**/${p.src}/**`);
    filters.unshift("**");
    stream = stream.pipe(filter(filters));
  }

  return stream
    .pipe(errorsLogger())
    .pipe(newer({ dest: base, map: mapSrcToLib }))
    .pipe(compilationLogger())
    .pipe(
      babel({
        caller: {
          // We have wrapped packages/babel-core/src/config/files/configuration.js with feature detection
          supportsDynamicImport: true,
        },
      })
    )
    .pipe(
      // Passing 'file.relative' because newer() above uses a relative
      // path and this keeps it consistent.
      rename(file => path.resolve(file.base, mapSrcToLib(file.relative)))
    )
    .pipe(gulp.dest(base));
}

// If this build is part of a pull request, include the pull request number in
// the version number.
let versionSuffix = "";
if (process.env.CIRCLE_PR_NUMBER) {
  versionSuffix = "+pr." + process.env.CIRCLE_PR_NUMBER;
}

const babelVersion =
  require("./packages/babel-core/package.json").version + versionSuffix;
function buildRollup(packages, targetBrowsers) {
  const sourcemap = process.env.NODE_ENV === "production";
  return Promise.all(
    packages.map(async ({ src, format, dest, name, filename }) => {
      const pkgJSON = require("./" + src + "/package.json");
      const version = pkgJSON.version + versionSuffix;
      const { dependencies = {}, peerDependencies = {} } = pkgJSON;
      const external = Object.keys(dependencies).concat(
        Object.keys(peerDependencies)
      );
      let nodeResolveBrowser = false,
        babelEnvName = "rollup";
      switch (src) {
        case "packages/babel-standalone":
          nodeResolveBrowser = true;
          babelEnvName = "standalone";
          break;
      }
      const input = getIndexFromPackage(src);
      fancyLog(`Compiling '${chalk.cyan(input)}' with rollup ...`);
      const bundle = await rollup.rollup({
        input,
        external,
        plugins: [
          rollupBabelSource(),
          rollupReplace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            BABEL_VERSION: JSON.stringify(babelVersion),
            VERSION: JSON.stringify(version),
          }),
          rollupBabel({
            envName: babelEnvName,
            babelrc: false,
            babelHelpers: "bundled",
            extends: "./babel.config.js",
            extensions: [".mjs", ".cjs", ".ts", ".js"],
          }),
          rollupNodeResolve({
            extensions: [".mjs", ".cjs", ".ts", ".js", ".json"],
            browser: nodeResolveBrowser,
            preferBuiltins: true,
            //todo: remove when semver and source-map are bumped to latest versions
            dedupe(importee) {
              return ["semver", "source-map"].includes(importee);
            },
          }),
          rollupCommonJs({
            include: [
              /node_modules/,
              "packages/babel-runtime/regenerator/**",
              "packages/babel-preset-env/data/*.js",
              // Rollup doesn't read export maps, so it loads the cjs fallback
              "packages/babel-compat-data/*.js",
            ],
          }),
          rollupJson(),
          targetBrowsers &&
            rollupNodePolyfills({
              sourceMap: sourcemap,
              include: "**/*.{js,ts}",
            }),
        ].filter(Boolean),
      });

      const outputFile = path.join(src, dest, filename || "index.js");
      await bundle.write({
        file: outputFile,
        format,
        name,
        sourcemap: sourcemap,
        exports: "named",
      });

      if (!process.env.IS_PUBLISH) {
        fancyLog(
          chalk.yellow(
            `Skipped minification of '${chalk.cyan(
              outputFile
            )}' because not publishing`
          )
        );
        return undefined;
      }
      fancyLog(`Minifying '${chalk.cyan(outputFile)}'...`);

      await bundle.write({
        file: outputFile.replace(/\.js$/, ".min.js"),
        format,
        name,
        sourcemap: sourcemap,
        exports: "named",
        plugins: [
          rollupTerser({
            // workaround https://bugs.webkit.org/show_bug.cgi?id=212725
            output: {
              ascii_only: true,
            },
          }),
        ],
      });
    })
  );
}

const libBundles = [
  "packages/babel-parser",
  "packages/babel-plugin-proposal-optional-chaining",
  "packages/babel-helper-member-expression-to-functions",
].map(src => ({
  src,
  format: "cjs",
  dest: "lib",
}));

const standaloneBundle = [
  {
    src: "packages/babel-standalone",
    format: "umd",
    name: "Babel",
    filename: "babel.js",
    dest: "",
    version: babelVersion,
  },
];

gulp.task("build-rollup", () => buildRollup(libBundles));
gulp.task("build-babel-standalone", () => buildRollup(standaloneBundle, true));

gulp.task("build-babel", () => buildBabel(/* exclude */ libBundles));
gulp.task("build", gulp.parallel("build-rollup", "build-babel"));

gulp.task("default", gulp.series("build"));

gulp.task("build-no-bundle", () => buildBabel());

gulp.task(
  "watch",
  gulp.series("build-no-bundle", function watch() {
    gulp.watch(defaultSourcesGlob, gulp.task("build-no-bundle"));
  })
);
