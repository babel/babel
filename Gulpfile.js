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
var dest = "packages";

gulp.task("default", ["build"]);

gulp.task("build", function () {
  return gulp.src(scripts)
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err.stack);
      }
    }))
    .pipe(through.obj(function (file, enc, callback) {
      file._path = file.path;
      // Replace src with lib
      var sub = file.path.substr(__dirname.length);
      var pathComp = path.normalize(sub).split(path.sep);
      var idx = pathComp.indexOf("src");
      if (idx < 0) {
        return callback(new Error("Failed to construct build path: " + file.path));
      }
      pathComp[idx] = "lib";
      file.path = path.join(__dirname, path.join.apply(null, pathComp));
      callback(null, file);
    }))
    .pipe(newer(dest))
    .pipe(through.obj(function (file, enc, callback) {
      gutil.log("Compiling", "'" + chalk.cyan(file._path) + "'...");
      callback(null, file);
    }))
    .pipe(babel())
    .pipe(gulp.dest(dest));
});

gulp.task("watch", ["build"], function (callback) {
  watch(scripts, function () {
    gulp.start("build");
  });
});
