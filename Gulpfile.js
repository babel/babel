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
const webpack = require("webpack");
const rollup = require("rollup");
const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupReplace = require("rollup-plugin-replace");
const { registerStandalonePackageTask } = require("./scripts/gulp-tasks");

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

function buildRollup(packages) {
  return Promise.all(
    packages.map(pkg => {
      const input = getIndexFromPackage(pkg);
      fancyLog(`Compiling '${chalk.cyan(input)}' with rollup ...`);
      return rollup
        .rollup({
          input,
          plugins: [
            rollupReplace({
              "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            }),
            rollupBabel({
              envName: "babel-parser",
            }),
            rollupNodeResolve(),
          ],
        })
        .then(bundle => {
          return bundle.write({
            file: path.join(pkg, "lib/index.js"),
            format: "cjs",
            name: "babel-parser",
            sourcemap: process.env.NODE_ENV !== "production",
          });
        });
    })
  );
}

const bundles = ["packages/babel-parser"];

gulp.task("build-rollup", () => buildRollup(bundles));
gulp.task("build-babel", () => buildBabel(/* exclude */ bundles));
gulp.task("build-babel-types", () =>
  buildBabel(/* exclude */ bundles, "packages/babel-types/src/**/*.js")
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

registerStandalonePackageTask(
  gulp,
  "babel",
  "Babel",
  path.join(__dirname, "packages"),
  require("./packages/babel-standalone/package.json").version
);

const presetEnvWebpackPlugins = [
  new webpack.NormalModuleReplacementPlugin(
    /\.\/available-plugins/,
    require.resolve(
      path.join(
        __dirname,
        "./packages/babel-preset-env-standalone/src/available-plugins"
      )
    )
  ),
  new webpack.NormalModuleReplacementPlugin(
    /caniuse-lite\/data\/regions\/.+/,
    require.resolve(
      path.join(
        __dirname,
        "./packages/babel-preset-env-standalone/src/caniuse-lite-regions"
      )
    )
  ),
];

registerStandalonePackageTask(
  gulp,
  "babel-preset-env",
  "babelPresetEnv",
  path.join(__dirname, "packages"),
  require("./packages/babel-preset-env-standalone/package.json").version,
  presetEnvWebpackPlugins
);
