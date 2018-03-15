"use strict";

const plumber = require("gulp-plumber");
const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rename = require("gulp-rename");
const pump = require("pump");
const gutil = require("gulp-util");
const filter = require("gulp-filter");
const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const merge = require("merge-stream");
const rollup = require("rollup-stream");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const rollupBabel = require("rollup-plugin-babel");
const rollupReplace = require("rollup-plugin-replace");
const rollupCommonJs = require("rollup-plugin-commonjs");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const uglify = require("gulp-uglify");
const rollupJson = require("rollup-plugin-json");
const registerStandalonePackageTask = require("./scripts/gulp-tasks")
  .registerStandalonePackageTask;

const sources = ["codemods", "packages"];

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

function compilationLogger(name, rollup) {
  return through.obj(function(file, enc, callback) {
    gutil.log(
      `Compiling '${chalk.cyan(name || file.relative)}'${
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

function buildBabel(exclude) {
  return merge(
    sources.map(source => {
      const base = path.join(__dirname, source);

      let stream = gulp.src(getGlobFromSource(source), { base: base });

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
          rename(relativePath => {
            relativePath.dirname = swapSrcWithLib(relativePath.dirname);
          })
        )
        .pipe(gulp.dest(base));
    })
  );
}

function buildRollup(packages) {
  return merge(
    Object.keys(packages).map(pkg => {
      let babelVersion = require("./packages/babel-core/package.json").version;
      const { format, dest, name, filename, minify } = packages[pkg];
      let { version = babelVersion } = packages[pkg];

      // If this build is part of a pull request, include the pull request number in
      // the version number.
      if (process.env.CIRCLE_PR_NUMBER) {
        const prVersion = "+pr." + process.env.CIRCLE_PR_NUMBER;
        babelVersion += prVersion;
        version += prVersion;
      }

      let letMinifyArgs = [];
      if (minify) {
        letMinifyArgs = [
          process.env.CI ? [] : uglify(),
          rename({ extname: ".min.js" }),
          gulp.dest(path.join(pkg, dest)),
        ];
      }
      return pump(
        rollup({
          rollup: require("rollup"),
          input: getIndexFromPackage(pkg),
          output: {
            format,
            name,
          },
          external: ["fs", "path"],
          plugins: [
            {
              name: "babel-source",
              load(id) {
                const matches = id.match(/packages\/(babel-[^/]+)\/src\//);
                if (matches) {
                  // check if browser field exists for this file and replace
                  const packageFolder = path.join(
                    __dirname,
                    "packages",
                    matches[1]
                  );
                  const packageJson = require(path.join(
                    packageFolder,
                    "package.json"
                  ));

                  if (
                    packageJson["browser"] &&
                    typeof packageJson["browser"] === "object"
                  ) {
                    for (let nodeFile in packageJson["browser"]) {
                      const browserFile = packageJson["browser"][
                        nodeFile
                      ].replace(/^(\.\/)?lib\//, "src/");
                      nodeFile = nodeFile.replace(/^(\.\/)?lib\//, "src/");
                      if (id.endsWith(nodeFile)) {
                        if (browserFile === false) {
                          console.log(`Ignore ${nodeFile}`);
                          return "";
                        }
                        console.log(`Replace ${nodeFile} with ${browserFile}`);
                        return fs.readFileSync(
                          path.join(packageFolder, browserFile),
                          "UTF-8"
                        );
                      }
                    }
                  }
                }
              },
              resolveId(importee) {
                const matches = importee.match(/^@babel\/([^/]+)$/);
                if (matches) {
                  // resolve babel package names to their src index file
                  const packageFolder = path.join(
                    __dirname,
                    "packages",
                    `babel-${matches[1]}`
                  );
                  const packageJson = require(path.join(
                    packageFolder,
                    "package.json"
                  ));

                  const filename =
                    typeof packageJson["browser"] === "string"
                      ? packageJson["browser"]
                      : packageJson["main"];

                  console.log(
                    `Resolving ${importee} to ${filename.replace(
                      /^(\.\/)?lib\//,
                      "src/"
                    )}`
                  );

                  return path.join(
                    packageFolder,
                    // replace lib with src in the pkg.json entry
                    filename.replace(/^(\.\/)?lib\//, "src/")
                  );
                }
              },
            },
            rollupJson(),
            rollupNodeResolve({
              browser: true,
              jsnext: true,
            }),
            rollupReplace({
              "process.env.NODE_ENV": '"production"',
              "process.env.BABEL_ENV": '""',
              "process.env.TERM": '""',
              "process.platform": '""',
              "process.env": JSON.stringify({}),
              BABEL_VERSION: JSON.stringify(babelVersion),
              VERSION: JSON.stringify(version),
            }),
            rollupBabel({
              envName: "rollup",
              babelrc: false,
              extends: "./.babelrc.js",
            }),
            rollupCommonJs(),
          ],
        }),
        source("index.js"),
        buffer(),
        errorsLogger(),
        compilationLogger(pkg, /* rollup */ true),
        rename(path => {
          path.basename = filename || path.basename;
        }),
        gulp.dest(path.join(pkg, dest)),
        ...letMinifyArgs,
        function(err) {
          if (err) throw err;
        }
      );
    })
  );
}

gulp.task("default", ["build"]);

const bundles = {
  "packages/babylon": {
    format: "cjs",
    dest: "lib",
    version: require("./packages/babylon/package.json").version,
  },
  "packages/babel-standalone": {
    format: "umd",
    name: "Babel",
    filename: "babel",
    dest: "",
    minify: true,
  },
  /*"packages/preset-env-standalone": {
    format: "umd",
    name: "Babel",
    filename: "babel",
    dest: "",
    minify: true,
  },*/
};

gulp.task("build", function() {
  return merge(
    buildBabel(/* exclude */ Object.keys(bundles)),
    buildRollup({ "packages/babylon": bundles["packages/babylon"] })
  );
});

gulp.task("bundle", function() {
  return buildRollup(bundles);
});

gulp.task("build-no-bundle", () => buildBabel());

gulp.task("watch", ["build-no-bundle"], function() {
  watch(sources.map(getGlobFromSource), { debounceDelay: 200 }, function() {
    gulp.start("build-no-bundle");
  });
});

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
