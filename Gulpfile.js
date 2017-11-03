"use strict";

const plumber = require("gulp-plumber");
const through = require("through2");
const chalk = require("chalk");
const pump = require("pump");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const gutil = require("gulp-util");
const filter = require("gulp-filter");
const gulp = require("gulp");
const path = require("path");
const merge = require("merge-stream");
const RootMostResolvePlugin = require("webpack-dependency-suite")
  .RootMostResolvePlugin;
const webpack = require("webpack");
const webpackStream = require("webpack-stream");

const sources = ["codemods", "packages", "experimental"];

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[1] = "lib";
  return parts.join(path.sep);
}

function getGlobFromSource(source) {
  return `./${source}/*/src/**/*.js`;
}

gulp.task("default", ["build"]);

gulp.task("build", function() {
  return merge(
    sources.map(source => {
      const base = path.join(__dirname, source);
      const f = filter(["**", "!**/packages/babylon/**"]);

      return gulp
        .src(getGlobFromSource(source), { base: base })
        .pipe(f)
        .pipe(
          plumber({
            errorHandler: function(err) {
              gutil.log(err.stack);
            },
          })
        )
        .pipe(
          newer({
            dest: base,
            map: swapSrcWithLib,
          })
        )
        .pipe(
          through.obj(function(file, enc, callback) {
            gutil.log("Compiling", "'" + chalk.cyan(file.relative) + "'...");
            callback(null, file);
          })
        )
        .pipe(babel())
        .pipe(
          through.obj(function(file, enc, callback) {
            // Passing 'file.relative' because newer() above uses a relative
            // path and this keeps it consistent.
            file.path = path.resolve(file.base, swapSrcWithLib(file.relative));
            callback(null, file);
          })
        )
        .pipe(gulp.dest(base));
    })
  );
});

gulp.task("watch", ["build"], function() {
  watch(sources.map(getGlobFromSource), { debounceDelay: 200 }, function() {
    gulp.start("build");
  });
});

gulp.task("build-babel-standalone", cb => {
  pump(
    [
      gulp.src(__dirname + "/packages/babel-standalone/src/index.js"),
      webpackBuild(),
      gulp.dest(__dirname + "/packages/babel-standalone"),
      uglify(),
      rename({ extname: ".min.js" }),
      gulp.dest(__dirname + "/packages/babel-standalone"),
    ],
    cb
  );
});

function webpackBuild() {
  let version = require("./packages/babel-core/package.json").version;

  // If this build is part of a pull request, include the pull request number in
  // the version number.
  if (process.env.CIRCLE_PR_NUMBER) {
    version += "+pr." + process.env.CIRCLE_PR_NUMBER;
  }

  const config = {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /node_modules/,
          loader: "babel-loader",
          options: {
            // Some of the node_modules may have their own "babel" section in
            // their project.json (or a ".babelrc" file). We need to ignore
            // those as we're using our own Babel options.
            babelrc: false,
            presets: [
              [
                "@babel/env",
                {
                  loose: true,
                  exclude: ["transform-typeof-symbol"],
                },
              ],
            ],
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            // Some of the node_modules may have their own "babel" section in
            // their project.json (or a ".babelrc" file). We need to ignore
            // those as we're using our own Babel options.
            babelrc: false,
            presets: [
              [
                "@babel/env",
                {
                  loose: true,
                  exclude: ["transform-typeof-symbol"],
                },
              ],
              ["@babel/stage-0", { loose: true }],
            ],
          },
        },
      ],
      // babylon is already bundled and does not require parsing
      noParse: [/babylon\/lib/],
    },
    node: {
      // Mock Node.js modules that Babel require()s but that we don't
      // particularly care about.
      fs: "empty",
      module: "empty",
      net: "empty",
    },
    output: {
      filename: "babel.js",
      library: "Babel",
      libraryTarget: "umd",
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"production"',
        BABEL_VERSION: JSON.stringify(version),
        VERSION: JSON.stringify(version),
      }),
      /*new webpack.NormalModuleReplacementPlugin(
        /..\/..\/package/,
        "../../../../src/babel-package-shim"
      ),*/
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    resolve: {
      plugins: [
        // Dedupe packages that are used across multiple plugins.
        // This replaces DedupePlugin from Webpack 1.x
        new RootMostResolvePlugin(__dirname, true),
      ],
    },
  };

  return webpackStream(config, webpack);
  // To write JSON for debugging:
  /*return webpackStream(config, webpack, (err, stats) => {
    require('gulp-util').log(stats.toString({colors: true}));
    require('fs').writeFileSync('webpack-debug.json', JSON.stringify(stats.toJson()));
  });*/
}
