require("shelljs/global");

var readline = require("readline-sync");
var semver   = require("semver");
var child    = require("child_process");
var fs       = require("fs");

var PACKAGE_LOC = __dirname + "/../packages";
var VERSION_LOC = __dirname + "/../VERSION";

var CURRENT_VERSION = fs.readFileSync(VERSION_LOC, "utf8").trim();
console.log("Current version:", CURRENT_VERSION);

var FORCE_VERSION = process.env.FORCE_VERSION;
FORCE_VERSION = FORCE_VERSION ? FORCE_VERSION.split(",") : [];

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

function publish() {
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
    if (diff || FORCE_VERSION.indexOf("*") >= 0 || FORCE_VERSION.indexOf(name) >= 0) {
      console.log("Changes detected to package", name);
      changedPackages.push(name);
    }
  });

  if (!changedPackages.length && !FORCE_VERSION.length) {
    throw new Error("No packages changed.");
  }

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

  exec("make build-dist");

  changedPackages.forEach(function (name) {
    // prepublish script
    var prePub = getPackageLocation(name) + "/scripts/prepublish.js";
    if (fs.existsSync(prePub)) require(prePub);
  });

  changedPackages.forEach(function (name) {
    var loc = getPackageLocation(name);
    exec("cd " + loc + " && npm publish --tag old", true);

    // postpublish script
    var postPub = loc + "/scripts/postpublish.js";
    if (fs.existsSync(postPub)) require(postPub);
  });
}

var originalCommit = exec("");

try {
  publish();
} catch (err) {
  // todo: unpublish npm packages already created
  console.log(err.stack);
  console.log("Rolling back to commit", originalCommit, "...");
  exec("git checkout --hard " + originalCommit, true);
  return;
}

exec("git push", true);
exec("git push --tags", true);
