import path from "path";
import os from "os";
import fs from "fs";

var FILENAME = process.env.BABEL_CACHE_PATH || path.join(os.tmpdir(), "babel.json");
var data = {};

export function save() {
  fs.writeFileSync(FILENAME, JSON.stringify(data, null, "  "));
}

export function load() {
  if (process.env.BABEL_DISABLE_CACHE) return;

  process.on("exit", save);

  var sigint = function () {
    process.removeListener("SIGINT", sigint);
    save();
    process.kill(process.pid, "SIGINT");
  };

  process.on("SIGINT", sigint);

  if (!fs.existsSync(FILENAME)) return;

  try {
    data = JSON.parse(fs.readFileSync(FILENAME));
  } catch (err) {
    return;
  }
}

export function get() {
  return data;
}
