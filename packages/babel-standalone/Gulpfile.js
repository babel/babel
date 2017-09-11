const registerBabelStandaloneTask = require("./src/gulpTasks")
  .registerBabelStandaloneTask;
const gulp = require("gulp");

const version = require("./package.json").version;
registerBabelStandaloneTask(gulp, "babel", "Babel", __dirname, version);
