/* eslint indent: 0 */

/**
 * This tiny wrapper file checks for known node flags and appends them
 * when found, before invoking the "real" _babel-node(1) executable.
 */

let getV8Flags = require("v8flags");
let path = require("path");

let args = [path.join(__dirname, "_babel-node")];

let babelArgs = process.argv.slice(2);
let userArgs;

// separate node arguments from script arguments
let argSeparator = babelArgs.indexOf("--");
if (argSeparator > -1) {
  userArgs  = babelArgs.slice(argSeparator); // including the  --
  babelArgs = babelArgs.slice(0, argSeparator);
}

getV8Flags(function (err, v8Flags) {
  babelArgs.forEach(function(arg) {
    let flag = arg.split("=")[0];

    switch (flag) {
      case "-d":
        args.unshift("--debug");
        break;

      case "debug":
      case "--debug":
      case "--debug-brk":
        args.unshift(arg);
        break;

      case "--expose_debug_as":
        args.unshift(arg);
        break;

      case "-gc":
      case "--expose-gc":
        args.unshift("--expose-gc");
        break;

      case "--nolazy":
        args.unshift("--nolazy");
        break;

      default:
        if (v8Flags.indexOf(arg) >= 0 || arg.indexOf("--trace") === 0) {
          args.unshift(arg);
        } else {
          args.push(arg);
        }
        break;
    }
  });

  // append arguments passed after --
  if (argSeparator > -1) {
    args = args.concat(userArgs);
  }

  try {
    let kexec = require("kexec");
    kexec(process.argv[0], args);
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") throw err;

    let child_process = require("child_process");
    let proc = child_process.spawn(process.argv[0], args, { stdio: "inherit" });
    proc.on("exit", function (code, signal) {
      process.on("exit", function () {
        if (signal) {
          process.kill(process.pid, signal);
        } else {
          process.exit(code);
        }
      });
    });
  }
});
