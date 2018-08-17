"use strict";

const plumber = require("gulp-plumber");
const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const gulpWatch = require("gulp-watch");
const gutil = require("gulp-util");
const filter = require("gulp-filter");
const gulp = require("gulp");
const path = require("path");
const webpack = require("webpack");
const merge = require("merge-stream");
const rollup = require("rollup-stream");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const registerStandalonePackageTask = require("./scripts/gulp-tasks")
  .registerStandalonePackageTask;

const sources = ["codemods", "packages"];
const helpersSource = [
  "packages/babel-helpers/src/helpers.js",
  "packages/babel-helpers/src/helpers/*.js",
];

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[1] = "lib";
  return parts.join(path.sep);
}

function getGlobFromSource(source) {
  return `./${source}/*/src/**/*.js`;
}

function getIndexFromPackage(name) {
  return `${name}/src/index.js`;
}

function compilationLogger(rollup) {
  return through.obj(function(file, enc, callback) {
    gutil.log(
      `Compiling '${chalk.cyan(file.relative)}'${
        rollup ? " with rollup " : ""
      }...`
    );
    callback(null, file);
  });
}

function errorsLogger() {
  return plumber({
    errorHandler(err) {
      gutil.log(err.stack);
    },
  });
}

function rename(fn) {
  return through.obj(function(file, enc, callback) {
    file.path = fn(file);
    callback(null, file);
  });
}

function buildBabel(exclude) {
  return merge(
    sources.map(source => {
      const base = path.join(__dirname, source);

      const filters = ["**", ...helpersSource.map(p => "!" + p)];
      if (exclude) filters.push(...exclude.map(p => `!**/${p}/**`));

      return gulp
        .src(getGlobFromSource(source), { base: base })
        .pipe(filter(filters))
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
    })
  );
}

function buildBabelHelpers() {
  const base = path.join(__dirname, "packages");
  return gulp
    .src("packages/babel-helpers/src/helpers.js", { base: "packages" })
    .pipe(errorsLogger())
    .pipe(
      newer({
        dest: base,
        map: swapSrcWithLib,
        extra: "packages/babel-helpers/src/helpers/*.js",
      })
    )
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
  return merge(
    packages.map(pkg => {
      return rollup({
        input: getIndexFromPackage(pkg),
        format: "cjs",
        plugins: [
          rollupBabel({
            envName: "babel-parser",
          }),
          rollupNodeResolve(),
        ],
      })
        .pipe(source("index.js"))
        .pipe(buffer())
        .pipe(errorsLogger())
        .pipe(compilationLogger(/* rollup */ true))
        .pipe(gulp.dest(path.join(pkg, "lib")));
    })
  );
}

gulp.task("build", function() {
  const bundles = ["packages/babel-parser"];

  return merge([
    buildBabel(/* exclude */ bundles),
    buildBabelHelpers(),
    buildRollup(bundles),
  ]);
});

gulp.task("default", gulp.series("build"));

gulp.task("build-no-bundle", () => merge([buildBabel(), buildBabelHelpers()]));

gulp.task(
  "watch",
  gulp.series("build-no-bundle", function watch() {
    const globs = [
      ...sources.map(getGlobFromSource),
      ...helpersSource.map(p => "!" + p),
    ];

    gulpWatch(globs, { debounceDelay: 200 }, () => buildBabel());

    // babel-helpers/src/helpers.js needs to be watched alongside with
    // all its preloaded dependencies.
    gulpWatch(helpersSource, { debounceDelay: 200 }, () => buildBabelHelpers());
  })
);

registerStandalonePackageTask(
  gulp,
  "babel",
  "Babel",
  path.join(__dirname, "packages"),
  require("./packages/babel-core/package.json").version
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
  require("./packages/babel-preset-env/package.json").version,
  presetEnvWebpackPlugins
);
