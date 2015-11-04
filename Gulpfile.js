var cached = require("gulp-cached");
var rename = require("gulp-rename");
var babel  = require("gulp-babel");
var watch  = require("gulp-watch");
var gulp   = require("gulp");
var path = require("path");

var scripts = "./packages/*/src/**/*.js";

gulp.task("default", ["build"]);

gulp.task("build", function () {
  return gulp.src(scripts)
    .pipe(cached("babel"))
    .pipe(babel())
    .pipe(rename(function (file) {
      console.log("Compiling " + path.join(
        file.dirname,
        file.basename + file.extname
      ));
      file.dirname = file.dirname.replace(/^([^\\]+)\/src/, "$1/lib");
    }))
    .pipe(gulp.dest("packages"));
});

gulp.task("watch", ["build"], function (callback) {
  watch(scripts, function () {
    gulp.start("build");
  });
});
