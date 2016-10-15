var plumber = require("gulp-plumber");
var through = require("through2");
var chalk   = require("chalk");
var newer   = require("gulp-newer");
var babel   = require("gulp-babel");
var watch   = require("gulp-watch");
var gutil   = require("gulp-util");
var gulp    = require("gulp");
var path    = require("path");

var scripts = "./packages/*/src/**/*.js";

var srcEx, libFragment;

if (path.win32 === path) {
  srcEx = /(packages\\[^\\]+)\\src\\/;
  libFragment = "$1\\lib\\";
} else {
  srcEx = new RegExp("(packages/[^/]+)/src/");
  libFragment = "$1/lib/";
}

var mapToDest = function (path) { return path.replace(srcEx, libFragment); };
var dest = "packages";

gulp.task("default", ["build"]);

gulp.task("build", function () {
  return gulp.src(scripts)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err.stack);
      }
    }))
    .pipe(newer({map: mapToDest}))
    .pipe(through.obj(function (file, enc, callback) {
      gutil.log("Compiling", "'" + chalk.cyan(file.path) + "'...");
      callback(null, file);
    }))
    .pipe(babel())
    .pipe(through.obj(function (file, enc, callback) {
      file._path = file.path;
      file.path = mapToDest(file.path);
      callback(null, file);
    }))
    .pipe(gulp.dest(dest));
});

gulp.task("watch", ["build"], function (callback) {
  watch(scripts, {debounceDelay: 200}, function () {
    gulp.start("build");
  });
});
