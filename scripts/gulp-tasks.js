"use strict";

/**
 * This file contains the Gulp tasks for babel-standalone. Note that
 * babel-standalone is compiled using Webpack, and performs its own Babel
 * compilation of all the JavaScript files. This is because it targets web
 * browsers, so more transforms are needed than the regular Babel builds that
 * only target Node.js.
 *
 * The tasks in this file are designed to be reusable, so that they can be used
 * to make standalone builds of other Babel plugins/presets (such as babel-minify)
 */

const path = require("path");
const pump = require("pump");
const chalk = require("chalk");
const through = require("through2");
const fancyLog = require("fancy-log");
const rename = require("gulp-rename");
const RootMostResolvePlugin = require("webpack-dependency-suite")
  .RootMostResolvePlugin;
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify");

function webpackBuild(opts) {
  const plugins = opts.plugins || [];
  let babelVersion = require("../packages/babel-core/package.json").version;
  let version = opts.version || babelVersion;
  // If this build is part of a pull request, include the pull request number in
  // the version number.
  if (process.env.CIRCLE_PR_NUMBER) {
    const prVersion = "+pr." + process.env.CIRCLE_PR_NUMBER;
    babelVersion += prVersion;
    version += prVersion;
  }

  const config = {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            // Use the bundled config so that module syntax is passed through
            // for Webpack.
            envName: "standalone",
          },
        },
      ],
    },
    node: {
      // Mock Node.js modules that Babel require()s but that we don't
      // particularly care about.
      fs: "empty",
      module: "empty",
      net: "empty",
    },
    output: {
      filename: opts.filename,
      library: opts.library,
      libraryTarget: "umd",
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"production"',
        "process.env": JSON.stringify({ NODE_ENV: "production" }),
        BABEL_VERSION: JSON.stringify(babelVersion),
        VERSION: JSON.stringify(version),
      }),
      /*new webpack.NormalModuleReplacementPlugin(
        /..\/..\/package/,
        "../../../../src/babel-package-shim"
      ),*/
      new webpack.optimize.ModuleConcatenationPlugin(),
    ].concat(plugins),
    resolve: {
      plugins: [
        // Dedupe packages that are used across multiple plugins.
        // This replaces DedupePlugin from Webpack 1.x
        new RootMostResolvePlugin(__dirname, true),
      ],
    },
  };

  if (opts.library !== "Babel") {
    config.externals = {
      "@babel/standalone": "Babel",
    };
  }

  return webpackStream(config, webpack);
  // To write JSON for debugging:
  /*return webpackStream(config, webpack, (err, stats) => {
    require('fancy-log')(stats.toString({colors: true}));
    require('fs').writeFileSync('webpack-debug.json', JSON.stringify(stats.toJson()));
  });*/
}

function logUglify() {
  return through.obj(function(file, enc, callback) {
    fancyLog(
      `Minifying '${chalk.cyan(
        path.relative(path.join(__dirname, ".."), file.path)
      )}'...`
    );
    callback(null, file);
  });
}

function logNoUglify() {
  return through.obj(function(file, enc, callback) {
    fancyLog(
      chalk.yellow(
        `Skipped minification of '${chalk.cyan(
          path.relative(path.join(__dirname, ".."), file.path)
        )}' because not publishing`
      )
    );
    callback(null, file);
  });
}

function registerStandalonePackageTask(
  gulp,
  name,
  exportName,
  pathname,
  version,
  plugins
) {
  const standaloneName = name + "-standalone";
  const standalonePath = path.join(pathname, standaloneName);
  gulp.task("build-" + standaloneName, cb => {
    pump(
      [
        gulp.src(path.join(standalonePath, "src/index.js")),
        webpackBuild({
          filename: name + ".js",
          library: exportName,
          version,
          plugins,
        }),
        gulp.dest(standalonePath),
      ].concat(
        // Minification is super slow, so we skip it unless we are publishing
        process.env.IS_PUBLISH ? logUglify() : logNoUglify(),
        process.env.IS_PUBLISH ? uglify() : [],
        rename({ extname: ".min.js" }),
        gulp.dest(standalonePath)
      ),
      cb
    );
  });
}

module.exports = {
  webpackBuild: webpackBuild,
  registerStandalonePackageTask: registerStandalonePackageTask,
};
