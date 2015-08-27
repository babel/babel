require("shelljs/global");

var path = require("path");
var fs   = require("fs");

// uninstall global babel install
exec("npm list --global --depth 1 babel >/dev/null 2>&1 && npm uninstall -g babel || true");

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

// create links
packages.forEach(function (root) {
  console.log(root.name);

  var nodeModulesLoc = "packages/" + root.folder + "/node_modules";
  mkdir("-p", nodeModulesLoc);

  packages.forEach(function (sub) {
    if (!root.pkg.dependencies || !root.pkg.dependencies[sub.name]) return;

    if (!fs.existsSync(nodeModulesLoc + "/" + sub.name)) {
      console.log("Linking", "packages/" + sub.folder, "to", nodeModulesLoc + "/" + sub.name);
      ln("-s", "packages/" + sub.folder, nodeModulesLoc + "/" + sub.name);
    }
  });

  cd("packages/" + root.folder);
  exec("npm install");
  exec("npm link");
  cd("../..");
});

exec("git submodule update --init");
exec("make build");
