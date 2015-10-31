require("shelljs/global");

var readline = require("readline-sync");
var semver   = require("semver");
var chalk    = require("chalk");
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

function getPackageConfig(name) {
  return require(getPackageLocation(name) + "/package.json");
}

//

function updateDepsObject(changedPackages, deps) {
  for (var depName in deps) {
    // ensure this was generated and we're on the same major
    if (deps[depName][0] !== "^" || deps[depName][1] !== NEW_VERSION[0]) continue;

    if (changedPackages.indexOf(depName) >= 0) {
      deps[depName] = "^" + NEW_VERSION;
    }
  }
}

function publish() {
  var packageNames = fs.readdirSync(PACKAGE_LOC).filter(function (name) {
    return name[0] !== "." && fs.statSync(PACKAGE_LOC + "/" + name).isDirectory();
  });

  var lastTagCommit = exec("git rev-list --tags --max-count=1");
  var lastTag       = exec("git describe " + lastTagCommit);

  var changedPackages = [];
  var changedFiles = [VERSION_LOC];

  packageNames.forEach(function (name) {
    var config = getPackageConfig(name);
    if (config.private) return;

    // check if package has changed since last release
    var diff = exec("git diff " + lastTag + " -- " + getPackageLocation(name));
    if (diff || FORCE_VERSION.indexOf("*") >= 0 || FORCE_VERSION.indexOf(name) >= 0) {
      console.log(chalk.green("Changes detected to package", name));
      changedPackages.push(name);
    }
  });

  if (!changedPackages.length && !FORCE_VERSION.length) {
    throw new Error(chalk.red("No packages changed."));
  }

  //

  changedPackages.forEach(function (name) {
    var pkgLoc = getPackageLocation(name) + "/package.json";
    var pkg = require(pkgLoc);

    // set new version
    pkg.version = NEW_VERSION;

    // updated dependencies
    updateDepsObject(changedPackages, pkg.dependencies);
    updateDepsObject(changedPackages, pkg.devDependencies);

    // write new package
    fs.writeFileSync(pkgLoc, JSON.stringify(pkg, null, "  ") + "\n");

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
    exec("cd " + loc + " && npm publish", true);

    // postpublish script
    var postPub = loc + "/scripts/postpublish.js";
    if (fs.existsSync(postPub)) require(postPub);
    publishedPackages.push(name);
  });
}

var publishedPackages = [];
var originalCommit = exec("git rev-list --all --max-count=1");;

try {
  publish();
} catch (err) {
  console.log(chalk.red("There was a problem publishing."));
  console.log(err.stack);
  return;

  if (publishedPackages.length) {
    console.log(chalk.warning("Unpublishing published packages..."));

    publishedPackages.forEach(function () {
      var verInfo = name + "@" + NEW_VERSION;
      try {
        console.log(chalk.warning("Unpublishing " + verInfo + "..."));
        //exec("npm unpublish --force " + verInfo);
      } catch (err) {
        console.log(chalk.red("Failed to unpublish " + verInfo));
        console.log(err.stack);
      }
    });
  } else {
    console.log(chalk.warning("Rolling back to commit", originalCommit, "..."));
    //exec("git checkout --hard " + originalCommit, true);
  }

  return;
}

exec("git push", true);
exec("git push --tags", true);
