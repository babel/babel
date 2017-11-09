"use strict";

const plumber = require("gulp-plumber");
const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const gutil = require("gulp-util");
const filter = require("gulp-filter");
const gulp = require("gulp");
const path = require("path");
const webpack = require("webpack");
const merge = require("merge-stream");
const registerStandalonePackageTask = require("./scripts/gulp-tasks")
  .registerStandalonePackageTask;
const cacheKey = require("./scripts/build-cache-key");

const swapPackageWithKey = cacheKey.swapPackageWithKey;
const buildCacheKey = cacheKey.buildCacheKey;

const sources = ["codemods", "packages", "experimental"];

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[1] = "lib";
  return parts.join(path.sep);
}

function getGlobFromSource(source) {
  return `./${source}/*/src/**/*.js`;
}

function getPackageGlobFromSource(source) {
  return `./${source}/*/package.json`;
}

gulp.task("default", ["build"]);

gulp.task("build", ["build-lib", "build-cache-key"]);

gulp.task("watch", ["build"], function() {
  gulp.watch(sources.map(getGlobFromSource), { debounceDelay: 200 }, [
    "build-lib",
  ]);
  gulp.watch(sources.map(getPackageGlobFromSource), { debounceDelay: 200 }, [
    "build-cache-key",
  ]);
});

gulp.task("build-lib", function() {
  return merge(
    sources.map(source => {
      const base = path.join(__dirname, source);
      const f = filter(["**", "!**/packages/babylon/**"]);

      return gulp
        .src(getGlobFromSource(source), { base: base })
        .pipe(f)
        .pipe(withPlumber())
        .pipe(newer({ dest: base, map: swapSrcWithLib }))
        .pipe(logCompilingMessage())
        .pipe(babel())
        .pipe(rewriteFilePath(swapSrcWithLib))
        .pipe(gulp.dest(base));
    })
  );
});

gulp.task("build-cache-key", function() {
  return merge(
    sources.map(source => {
      const base = path.join(__dirname, source);

      return gulp
        .src(getPackageGlobFromSource(source), { base: base })
        .pipe(withPlumber())
        .pipe(newer({ dest: base, map: swapPackageWithKey }))
        .pipe(rewritePackageAsCacheKey())
        .pipe(logCompilingMessage())
        .pipe(gulp.dest(base));
    })
  );
});

function rewriteFilePath(nameMapper) {
  return through.obj(function(file, enc, callback) {
    // Passing 'file.relative' because newer() above uses a relative
    // path and this keeps it consistent.
    file.path = path.resolve(file.base, nameMapper(file.relative));
    callback(null, file);
  });
}

function rewritePackageAsCacheKey() {
  return through.obj(function(file, enc, callback) {
    if (!file.isBuffer()) throw new Error("File must be a Buffer");

    let result;

    try {
      result = buildCacheKey(file.relative, file.contents);
    } catch (err) {
      return callback(
        new gutil.PluginError("babel-build", err, {
          fileName: file.path,
          showProperties: false,
        })
      );
    }

    if (result) {
      file.path = path.resolve(file.base, result.name);
      file.contents = new Buffer(result.content);
    } else {
      file = null;
    }

    callback(null, file);
  });
}

function withPlumber() {
  return plumber({
    errorHandler: function(err) {
      gutil.log(err.stack);
    },
  });
}

function logCompilingMessage() {
  return through.obj(function(file, enc, callback) {
    gutil.log("Compiling", "'" + chalk.cyan(file.relative) + "'...");
    callback(null, file);
  });
}

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
        "./experimental/babel-preset-env-standalone/src/available-plugins"
      )
    )
  ),
  new webpack.NormalModuleReplacementPlugin(
    /caniuse-lite\/data\/regions\/.+/,
    require.resolve(
      path.join(
        __dirname,
        "./experimental/babel-preset-env-standalone/src/caniuse-lite-regions"
      )
    )
  ),
];

registerStandalonePackageTask(
  gulp,
  "babel-preset-env",
  "babelPresetEnv",
  path.join(__dirname, "experimental"),
  require("./experimental/babel-preset-env/package.json").version,
  presetEnvWebpackPlugins
);
