require("shelljs/global");

var readline = require("readline-sync");
var semver   = require("semver");
var child    = require("child_process");
var fs       = require("fs");

var PACKAGE_LOC = __dirname + "/../packages";
var VERSION_LOC = __dirname + "/../VERSION";

var CURRENT_VERSION = fs.readFileSync(VERSION_LOC, "utf8").trim();
console.log("Current version:", CURRENT_VERSION);

//

function getVersion() {
  var input = readline.question("New version (Leave blank for new patch): ");

  var ver = semver.valid(input);
  if (!ver) {
    ver = semver.inc(CURRENT_VERSION, input || "patch");
  }

  if (ver) {
    return ver;
  } else {
    console.log("Version provided is not valid semver.");
    return getVersion();
  }
}

var NEW_VERSION = getVersion();
fs.writeFileSync(VERSION_LOC, NEW_VERSION, "utf8");

//

function exec(cmd, log) {
  console.log("$", cmd);

  var out = child.execSync(cmd, {
    encoding: "utf8"
  }).trim();

  if (log) {
    if (out) console.log(out);
  } else {
    return out;
  }
}

function getPackageLocation(name) {
  return PACKAGE_LOC + "/" + name;
}

//

var packageNames = fs.readdirSync(PACKAGE_LOC).filter(function (name) {
  return name[0] !== ".";
});

var lastTagCommit = exec("git rev-list --tags --max-count=1");
var lastTag       = exec("git describe " + lastTagCommit);

var changedPackages = [];
var changedFiles = [VERSION_LOC];

packageNames.forEach(function (name) {
  // check if package has changed since last release
  var diff = exec("git diff " + lastTag + " -- " + getPackageLocation(name));
  if (diff || process.env.FORCE_VERSION) {
    console.log("Changes detected to package", name);
    changedPackages.push(name);
  }
});

//

changedPackages.forEach(function (name) {
  var loc = getPackageLocation(name);
  var pkgLoc = loc + "/package.json";
  var pkg = require(pkgLoc);

  // set new version
  pkg.version = NEW_VERSION;

  // updated dependencies
  for (var depName in pkg.dependencies) {
    if (changedPackages.indexOf(depName) >= 0) {
      pkg.dependencies[depName] = "^" + NEW_VERSION;
    }
  }

  // write new package
  fs.writeFileSync(pkgLoc, JSON.stringify(pkg, null, "  "));

  // push to be git committed
  changedFiles.push(pkgLoc);
});

changedFiles.forEach(function (loc) {
  exec("git add " + loc, true);
});

var NEW_TAG_NAME = "v" + NEW_VERSION;
exec("git commit -m " + NEW_TAG_NAME, true);
exec("git tag " + NEW_TAG_NAME, true);
exec("git push --tags", true);

exec("make build-dist");

changedPackages.forEach(function (name) {
  // prepublish script
  var prePub = getPackageLocation(name) + "/scripts/prepublish.js";
  if (fs.existsSync(prePub)) require(prePub);
});

changedPackages.forEach(function (name) {
  var loc = getPackageLocation(name);
  exec("cd " + loc + " && npm publish", true);

  // postpublish script
  var postPub = loc + "/scripts/postpublish.js";
  if (fs.existsSync(postPub)) require(postPub);
});
