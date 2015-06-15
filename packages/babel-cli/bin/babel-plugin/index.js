#!/usr/bin/env node

var readline = require("readline");
var child    = require("child_process");
var path     = require("path");
var fs       = require("fs");

function spawn(cmd, args, callback) {
  console.log(">", cmd, args);

  var spawn = child.spawn(cmd, args, { stdio: "inherit" });

  spawn.on("exit", function (code) {
    if (code === 0) {
      if (callback) callback();
    } else {
      console.log("Killing...");
      process.exit(1);
    }
  });
}

function spawnMultiple(cmds) {
  function next() {
    var cmd = cmds.shift();
    if (cmd) {
      spawn(cmd.command, cmd.args, next);
    } else {
      process.exit();
    }
  }

  next();
}

function template(name, data) {
  var source = fs.readFileSync(__dirname + "/templates/" + name, "utf8");
  source = source.replace(/[A-Z_]+/g, function (key) {
    return data[key] === undefined ? key : data[key];
  });
  return source;
}

function write(filename, content) {
  console.log(filename);
  fs.writeFileSync(filename, content);
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var BABEL_PLUGIN_PREFIX = "babel-plugin-";

var cmds = {
  init: function () {
    var name = path.basename(process.cwd());

    if (name.indexOf(BABEL_PLUGIN_PREFIX) === 0) {
      name = name.slice(BABEL_PLUGIN_PREFIX.length);
    }

    rl.question("Description (optional): ", function (description) {
      rl.question("GitHub Repository (eg. sebmck/babel-plugin-foobar) (optional): ", function (repo) {
        rl.close();

        var templateData = {
          DESCRIPTION: description,
          FULL_NAME: BABEL_PLUGIN_PREFIX + name,
          NAME: name
        };

        write("package.json", JSON.stringify({
          name: templateData.FULL_NAME,
          version: "1.0.0",
          description: templateData.DESCRIPTION,
          repository: repo || undefined,
          license: "MIT",
          main: "lib/index.js",

          devDependencies: {
            babel: "^5.6.0"
          },

          scripts: {
            build: "babel-plugin build",
            push:  "babel-plugin publish",
            test:  "babel-plugin test"
          },

          keywords: ["babel-plugin"]
        }, null, "  ") + "\n");

        write(".npmignore", "node_modules\n*.log\nsrc\n");

        write(".gitignore", "node_modules\n*.log\nlib\n");

        write("README.md", template("README.md", templateData));

        if (!fs.existsSync("src")) {
          fs.mkdirSync("src");
          write("src/index.js", template("index.js", templateData));
        }
      });
    });
  },

  build: function () {
    spawn("babel", ["src", "--out-dir", "lib", "--copy-files"]);
  },

  publish: function () {
    var pkg = require(process.cwd() + "/package.json");
    console.log("Current verison:", pkg.version);

    rl.question("New version (enter nothing for patch): ", function (newVersion) {
      rl.close();

      newVersion = newVersion || "patch";

      spawnMultiple([
        { command: "git", args: ["pull"] },
        { command: "git", args: ["push"] },
        { command: "babel-plugin", args: ["build"] },
        { command: "npm", args: ["version", newVersion] },
        { command: "npm", args: ["publish"] },
        { command: "git", args: ["push", "--follow-tags"] }
      ]);
    });
  }
};

var cmd = cmds[process.argv[2]];
if (cmd) {
  cmd();
} else {
  console.error("Unknown command:", cmd);
  process.exit(1);
}
