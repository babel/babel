"use strict";

const plumber = require("gulp-plumber");
const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const gulpWatch = require("gulp-watch");
const fancyLog = require("fancy-log");
const filter = require("gulp-filter");
const gulp = require("gulp");
const path = require("path");
const rollup = require("rollup");
const rollupAlias = require("@rollup/plugin-alias");
const rollupBabel = require("rollup-plugin-babel");
const rollupBabelSource = require("./rollup-plugin-babel-source");
const rollupCommonJs = require("rollup-plugin-commonjs");
const rollupJson = require("@rollup/plugin-json");
const rollupNodeBuiltins = require("rollup-plugin-node-builtins");
const rollupNodeGlobals = require("rollup-plugin-node-globals");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupReplace = require("rollup-plugin-replace");

const defaultSourcesGlob = "./@(codemods|packages|eslint)/*/src/**/*.js";

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[2] = "lib";
  return parts.join(path.sep);
}

function getIndexFromPackage(name) {
  return `${name}/src/index.js`;
}

function compilationLogger() {
  return through.obj(function(file, enc, callback) {
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
  return through.obj(function(file, enc, callback) {
    file.path = fn(file);
    callback(null, file);
  });
}

function buildBabel(exclude, sourcesGlob = defaultSourcesGlob) {
  const base = __dirname;

  let stream = gulp.src(sourcesGlob, { base: __dirname });

  if (exclude) {
    const filters = exclude.map(p => `!**/${p}/**`);
    filters.unshift("**");
    stream = stream.pipe(filter(filters));
  }

  return stream
    .pipe(errorsLogger())
    .pipe(newer({ dest: base, map: swapSrcWithLib }))
    .pipe(compilationLogger())
    .pipe(babel())
    .pipe(
      // Passing 'file.relative' because newer() above uses a relative
      // path and this keeps it consistent.
      rename(file => path.resolve(file.base, swapSrcWithLib(file.relative)))
    )
    .pipe(gulp.dest(base));
}

let babelVersion = require("./packages/babel-core/package.json").version;
function buildRollup(packages) {
  const sourcemap = process.env.NODE_ENV === "production";
  return Promise.all(
    packages.map(
      ({ src, format, dest, name, filename, version = babelVersion }) => {
        const extraPlugins = [];
        let inputExternal = undefined,
          outputGlobals = undefined,
          nodeResolveBrowser = false,
          babelEnvName = "rollup"
        switch (src) {
          case "packages/babel-standalone":
            nodeResolveBrowser = true;
            babelEnvName = "standalone";
            break;
          case "packages/babel-preset-env-standalone":
            nodeResolveBrowser = true;
            babelEnvName = "standalone";
            inputExternal = ["@babel/standalone"];
            outputGlobals = {
              "@babel/standalone": "Babel",
            };
            extraPlugins.push(
              rollupAlias({
                entries: [
                  {
                    find: "./available-plugins",
                    replacement: require.resolve(
                      path.join(__dirname, src, "./src/available-plugins")
                    ),
                  },
                  {
                    find: "caniuse-lite/data/regions",
                    replacement: require.resolve(
                      path.join(__dirname, src, "./src/caniuse-lite-regions")
                    ),
                  },
                ],
              })
            );
            break;
        }
        // If this build is part of a pull request, include the pull request number in
        // the version number.
        if (process.env.CIRCLE_PR_NUMBER) {
          const prVersion = "+pr." + process.env.CIRCLE_PR_NUMBER;
          babelVersion += prVersion;
          version += prVersion;
        }
        const input = getIndexFromPackage(src);
        fancyLog(`Compiling '${chalk.cyan(input)}' with rollup ...`);
        return rollup
          .rollup({
            input,
            external: inputExternal,
            plugins: [
              ...extraPlugins,
              rollupBabelSource(),
              rollupReplace({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                BABEL_VERSION: JSON.stringify(babelVersion),
                VERSION: JSON.stringify(version),
              }),
              rollupBabel({
                envName: babelEnvName,
                babelrc: false,
                extends: "./babel.config.js",
              }),
              rollupNodeResolve({
                browser: nodeResolveBrowser,
                preferBuiltins: true,
              }),
              rollupCommonJs({
                include: [/node_modules/, "packages/babel-preset-env/data/**"],
                namedExports: {
                  "babel-plugin-dynamic-import-node/utils.js": [
                    "createDynamicImportTransform",
                    "getImportSource",
                  ],
                  "@babel/standalone": ["availablePlugins", "registerPlugin"],
                },
              }),
              rollupJson(),
              rollupNodeBuiltins(),
              rollupNodeGlobals({ sourceMap: sourcemap }),
            ],
          })
          .then(bundle => {
            return bundle.write({
              file: path.resolve(src, dest, filename || "index.js"),
              format,
              name,
              globals: outputGlobals,
              sourcemap: sourcemap,
            });
          });
      }
    )
  );
}

const libBundles = [
  {
    src: "packages/babel-parser",
    format: "cjs",
    dest: "lib",
    version: require("./packages/babel-parser/package").version,
  },
];

const standaloneBundle = [
  {
    src: "packages/babel-standalone",
    format: "umd",
    name: "Babel",
    filename: "babel.js",
    dest: "",
    version: require("./packages/babel-core/package").version,
  },
];

const presetEnvStandaloneBundle = [
  {
    src: "packages/babel-preset-env-standalone",
    format: "umd",
    name: "BabelPresetEnv",
    filename: "babel-preset-env.js",
    dest: "",
    version: require("./packages/babel-preset-env/package").version,
  },
];

gulp.task("build-rollup", () => buildRollup(libBundles));
gulp.task("build-babel-standalone", () => buildRollup(standaloneBundle));

gulp.task("build-babel-preset-env-standalone", () =>
  buildRollup(presetEnvStandaloneBundle)
);

gulp.task("build-babel", () => buildBabel(/* exclude */ libBundles));
gulp.task("build-babel-types", () =>
  buildBabel(/* exclude */ libBundles, "packages/babel-types/src/**/*.js")
);
gulp.task("build", gulp.parallel("build-rollup", "build-babel"));

gulp.task("default", gulp.series("build"));

gulp.task("build-no-bundle", () => buildBabel());

gulp.task(
  "watch",
  gulp.series("build-no-bundle", function watch() {
    gulpWatch(
      defaultSourcesGlob,
      { debounceDelay: 200 },
      gulp.task("build-no-bundle")
    );
  })
);
