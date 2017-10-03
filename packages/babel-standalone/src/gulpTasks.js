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

// Must run first
require("./overrideModuleResolution")();

const pump = require("pump");
const rename = require("gulp-rename");
const RootMostResolvePlugin = require("webpack-dependency-suite").RootMostResolvePlugin;
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify");

function webpackBuild(filename, libraryName, version) {
  // If this build is part of a pull request, include the pull request number in
  // the version number.
  if (process.env.CIRCLE_PR_NUMBER) {
    version += '+pr.' + process.env.CIRCLE_PR_NUMBER;
  }
  const typeofPlugin = require("babel-plugin-transform-es2015-typeof-symbol")
    .default;

  // babel-plugin-transform-es2015-typeof-symbol is not idempotent, and something
  // else is already running it, so we need to exclude it from the transform.
  const preset2015 = require("babel-preset-es2015").default();
  const es2015WithoutTypeof = {
    plugins: preset2015.plugins.filter(plugin => plugin !== typeofPlugin),
  };

  const config = {
    module: {
      rules: [
        {
          //exclude: /node_modules/,
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            // Some of the node_modules may have their own "babel" section in
            // their project.json (or a ".babelrc" file). We need to ignore
            // those as we're using our own Babel options.
            babelrc: false,
            presets: [es2015WithoutTypeof, require("babel-preset-stage-0")],
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
      filename: filename,
      library: libraryName,
      libraryTarget: "umd",
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"production"',
        BABEL_VERSION:
          JSON.stringify(require("babel-core/package.json").version),
        VERSION: JSON.stringify(version),
      }),
      // Use browser version of visionmedia-debug
      new webpack.NormalModuleReplacementPlugin(
        /debug\/node/,
        "debug/src/browser"
      ),
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
        new RootMostResolvePlugin(__dirname + '/../../../', true),
      ],
    },
  };

  if (libraryName !== "Babel") {
    // This is a secondary package (eg. Babili), we should expect that Babel
    // was already loaded, rather than bundling it in here too.
    config.externals = {
      "babel-standalone": "Babel",
    };
  }
  return webpackStream(config, webpack);
  // To write JSON for debugging:
  /*return webpackStream(config, webpack, (err, stats) => {
    require('gulp-util').log(stats.toString({colors: true}));
    require('fs').writeFileSync('webpack-debug.json', JSON.stringify(stats.toJson()));
  });*/
}

function registerBabelStandaloneTask(gulp, name, exportName, path, version) {
  gulp.task("build-" + name + "-standalone", cb => {
    pump(
      [
        gulp.src(path + "/src/" + name + ".js"),
        webpackBuild(
          name + ".js",
          exportName,
          version
        ),
        gulp.dest(path),
        uglify(),
        rename({ extname: ".min.js" }),
        gulp.dest(path),
      ],
      cb
    );
  });
}

module.exports = {
  webpackBuild: webpackBuild,
  registerBabelStandaloneTask: registerBabelStandaloneTask,
}
