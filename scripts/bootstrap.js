require("shelljs/global");

var mkdirp = require("mkdirp");
var rimraf = require("rimraf");
var child  = require("child_process");
var async  = require("async");
var path   = require("path");
var fs     = require("fs");

var CURRENT_VERSION = fs.readFileSync(__dirname + "/../VERSION", "utf8").trim();

// uninstall global babel install
try {
  exec("npm uninstall -g babel");
} catch (err) {}

// get packages
var packages = [];
ls("packages/*").forEach(function (loc) {
  var name = path.basename(loc);
  if (name[0] === ".") return;

  var pkgLoc = __dirname + "/../packages/" + name + "/package.json";
  if (!fs.existsSync(pkgLoc)) return;

  var pkg = require(pkgLoc);
  packages.push({
    folder: name,
    pkg: pkg,
    name: pkg.name
  });
});

async.parallelLimit(packages.map(function (root) {
  return function (done) {
    console.log(root.name);

    var tasks = [];
    var nodeModulesLoc = process.cwd() + "/packages/" + root.folder + "/node_modules";

    tasks.push(function (done) {
      mkdirp(nodeModulesLoc, done);
    });

    tasks.push(function (done) {
      async.each(packages, function (sub, done) {
        var ver = false;
        if (root.pkg.dependencies) ver = root.pkg.dependencies[sub.name];
        if (root.pkg.devDependencies && !ver) ver = root.pkg.devDependencies[sub.name];
        if (!ver) return done();

        // ensure that this is referring to a local package
        if (ver[0] !== "^" || ver[1] !== CURRENT_VERSION[0]) return done();

        var linkSrc = process.cwd() + "/packages/" + sub.folder;
        var linkDest = nodeModulesLoc + "/" + sub.name;

        console.log("Linking", linkSrc, "to", linkDest);

        rimraf(linkDest, function (err) {
          if (err) return done(err);

          fs.mkdir(linkDest, function (err) {
            if (err) return done(err);

            fs.writeFile(linkDest + "/package.json", JSON.stringify({
              name: sub.name,
              version: require(linkSrc + "/package.json").version
            }, null, "  "), function (err) {
              if (err) return done(err);

              fs.writeFile(linkDest + "/index.js", 'module.exports = require("' + linkSrc + '");', done);
            });
          });
        });
      }, done);
    });

    tasks.push(function (done) {
      child.exec("npm install", {
        cwd: process.cwd() + "/packages/" + root.folder
      }, function (err, stdout, stderr) {
        if (err != null) {
          done(stderr);
        } else {
          stdout = stdout.trim();
          if (stdout) console.log(stdout);
          done();
        }
      });
    });

    async.series(tasks, done);
  };
}), 4, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    exec("make build");
    process.exit();
  }
});
