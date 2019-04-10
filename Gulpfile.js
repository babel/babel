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
const merge = require("merge-stream");
const rollup = require("rollup");
const rollupBabel = require("rollup-plugin-babel");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const { registerStandalonePackageTask } = require("./scripts/gulp-tasks");
const bundleParserHelper = require("./packages/babel-parser/scripts/build-bunde");

const sources = ["codemods", "packages"];

const parserCustomBundlerRoot = "babel-parser/src/index.js";
const parserCustomBundler = [
  parserCustomBundlerRoot,
  "**/tokenizer/**/*.js",
  "**/parser/**/*.js",
  "**/plugins/**/*.js",
];
const parserCustomBundlerOutputGlob = "./packages/babel-parser/bundle/**/*.js";

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[1] = "lib";
  return parts.join(path.sep);
}

function getGlobFromSource(source) {
  return `./${source}/*/src/**/*.js`;
}

function getIndexFromPackage(name) {
  return name.indexOf("babel-parser") > -1
    ? `${name}/bundle/index.js`
    : `${name}/src/index.js`;
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

function runParserBundler() {
  return through.obj(async function(file, enc, callback) {
    const transformedFile = file.clone();
    transformedFile.contents = new Buffer(
      await bundleParserHelper(transformedFile.path)
    );
    callback(null, transformedFile);
  });
}

function bundleParser() {
  const base = path.resolve(__dirname, "packages/babel-parser/src");
  const outputPath = path.join(__dirname, "packages/babel-parser/bundle");

  const filters = parserCustomBundler.map(p => `!**/${p}`);
  filters.unshift("**");

  const p = n => path.resolve("packages/babel-parser/src", n);

  return merge(
    gulp
      .src(path.join(base, "./index.js"), { base })
      .pipe(errorsLogger())
      .pipe(
        newer({
          dest: outputPath,
          extra: [p("tokenizer/*.js"), p("parser/*.js"), p("plugins/**/*.js")],
        })
      )
      .pipe(compilationLogger())
      .pipe(runParserBundler())
      .pipe(gulp.dest(outputPath)),
    gulp
      .src(base + "/**/*.js", { base })
      .pipe(filter(filters))
      .pipe(gulp.dest(outputPath))
  );
}

function buildBabel(exclude) {
  return merge(
    sources.map(source => {
      const base = path.join(__dirname, source);

      let src = getGlobFromSource(source);
      if (source === "packages") {
        src = [src, parserCustomBundlerOutputGlob];
      }

      let stream = gulp.src(src, { base: base });

      const filters = (exclude || []).map(p => `!**/${p}/**`);
      filters.unshift("**");
      filters.push("!**/babel-parser/src/**");
      stream = stream.pipe(filter(filters));

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
    })
  );
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
          });
        });
    })
  );
}

const bundles = ["packages/babel-parser"];

gulp.task(
  "build-rollup",
  gulp.series(bundleParser, () => buildRollup(bundles))
);
gulp.task("build-babel", () => buildBabel(/* exclude */ bundles));
gulp.task("build", gulp.parallel("build-rollup", "build-babel"));

gulp.task("default", gulp.series("build"));

gulp.task("build-no-bundle", gulp.series(bundleParser, () => buildBabel()));

gulp.task(
  "watch",
  gulp.series("build-no-bundle", function watch() {
    gulpWatch(
      sources.map(getGlobFromSource),
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
