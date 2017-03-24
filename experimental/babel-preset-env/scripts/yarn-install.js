"use strict";

const exec = require("child_process").exec;

const runIfYarn = fn => {
  exec("yarn -V", error => {
    if (error === null) fn();
  });
};
runIfYarn(() => {
  console.log("`package.json` was changed. Running yarn...🐈");
  exec("yarn");
});
