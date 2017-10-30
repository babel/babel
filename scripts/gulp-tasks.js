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
// require("./overrideModuleResolution")();
const path = require("path");
const pump = require("pump");
const rename = require("gulp-rename");
const { RootMostResolvePlugin } = require("webpack-dependency-suite");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const uglify = require("gulp-uglify");

const standalonePackagePlugins = {
  babelPresetEnv: [
    new webpack.NormalModuleReplacementPlugin(
      /\.\/available-plugins/,
      require.resolve(
        path.join(
          __dirname,
          "../experimental/babel-preset-env-standalone/src/available-plugins"
        )
      )
    ),
    new webpack.NormalModuleReplacementPlugin(
      /caniuse-lite\/data\/regions\/.+/,
      require.resolve(
        path.join(
          __dirname,
          "../experimental/babel-preset-env-standalone/src/caniuse-lite-regions"
        )
      )
    ),
  ],
};

function webpackBuild(opts) {
  const plugins = standalonePackagePlugins[opts.library] || [];
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
          include: /node_modules/,
          loader: "babel-loader",
          options: {
            // Some of the node_modules may have their own "babel" section in
            // their project.json (or a ".babelrc" file). We need to ignore
            // those as we're using our own Babel options.
            babelrc: false,
            presets: ["env"],
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
            presets: ["env", "stage-0"],
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
    require('gulp-util').log(stats.toString({colors: true}));
    require('fs').writeFileSync('webpack-debug.json', JSON.stringify(stats.toJson()));
  });*/
}

function registerStandalonePackageTask(
  gulp,
  name,
  exportName,
  pathname,
  version
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
        }),
        gulp.dest(standalonePath),
        uglify(),
        rename({ extname: ".min.js" }),
        gulp.dest(standalonePath),
      ],
      cb
    );
  });
}

module.exports = {
  webpackBuild: webpackBuild,
  registerStandalonePackageTask: registerStandalonePackageTask,
};
