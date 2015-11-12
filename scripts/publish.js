require("shelljs/global");

var readline = require("readline-sync");
var semver   = require("semver");
var chalk    = require("chalk");
var child    = require("child_process");
var async    = require("async");
var fs       = require("fs");

//

var PACKAGE_LOC = __dirname + "/../packages";
var VERSION_LOC = __dirname + "/../VERSION";

var NPM_OWNERS = fs.readFileSync(__dirname + "/../NPM_OWNERS", "utf8").trim().split("\n");
var changedPackages = [];
var changedFiles = [VERSION_LOC];

var CURRENT_VERSION = fs.readFileSync(VERSION_LOC, "utf8").trim();
console.log("Current version:", CURRENT_VERSION);

var FORCE_VERSION = process.env.FORCE_VERSION;
FORCE_VERSION = FORCE_VERSION ? FORCE_VERSION.split(",") : [];

var NEW_VERSION = getVersion();
fs.writeFileSync(VERSION_LOC, NEW_VERSION, "utf8");

//

try {
  checkUpdatedPackages();
  updateChangedPackages();
  updateTag();
  build();
  publish();
} catch (err) {
  onError(err);
}

//

var createdTag = false;

function updateTag() {
  var NEW_TAG_NAME = "v" + NEW_VERSION;
  execSync("git commit -m " + NEW_TAG_NAME, true);
  execSync("git tag " + NEW_TAG_NAME, true);
  createdTag = true;
}

function removeTag() {
  if (createdTag) {
    console.error(chalk.red("Attempting to roll back tag creation."));
    exec("git tag -d v" + NEW_VERSION, true);
  }
}

function build() {
  execSync("make build-dist");
}

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

function execSync(cmd, log) {
  var out = child.execSync(cmd, {
    encoding: "utf8"
  }).trim();

  console.log("$ " + cmd);

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

function updateDepsObject(deps) {
  for (var depName in deps) {
    // ensure this was generated and we're on the same major
    if (deps[depName][0] !== "^" || deps[depName][1] !== NEW_VERSION[0]) continue;

    if (changedPackages.indexOf(depName) >= 0) {
      deps[depName] = "^" + NEW_VERSION;
    }
  }
}

function checkUpdatedPackages() {
  var packageNames = fs.readdirSync(PACKAGE_LOC).filter(function (name) {
    return name[0] !== "." && fs.statSync(PACKAGE_LOC + "/" + name).isDirectory();
  });

  var lastTagCommit = execSync("git rev-list --tags --max-count=1");
  var lastTag       = execSync("git describe " + lastTagCommit);

  packageNames.forEach(function (name) {
    var config = getPackageConfig(name);
    if (config.private) return;

    // check if package has changed since last release
    var diff = execSync("git diff " + lastTag + " -- " + getPackageLocation(name));
    if (diff || FORCE_VERSION.indexOf("*") >= 0 || FORCE_VERSION.indexOf(name) >= 0) {
      console.log(chalk.green("Changes detected to package", name));
      changedPackages.push(name);
    }
  });

  if (!changedPackages.length && !FORCE_VERSION.length) {
    throw new Error(chalk.red("No packages changed."));
  }

  if (changedPackages.indexOf("babel-browser") < 0) {
    changedPackages.push("babel-browser");
  }
}

function updateChangedPackages() {
  changedPackages.forEach(function (name) {
    var pkgLoc = getPackageLocation(name) + "/package.json";
    var pkg = require(pkgLoc);

    // set new version
    pkg.version = NEW_VERSION;

    // updated dependencies
    updateDepsObject(pkg.dependencies);
    updateDepsObject(pkg.devDependencies);

    // write new package
    fs.writeFileSync(pkgLoc, JSON.stringify(pkg, null, "  ") + "\n");

    // push to be git committed
    changedFiles.push(pkgLoc);
  });

  changedFiles.forEach(function (loc) {
    execSync("git add " + loc, true);
  });
}

function publish() {
  changedPackages.forEach(function (name) {
    // prepublish script
    var prePub = getPackageLocation(name) + "/scripts/prepublish.js";
    if (fs.existsSync(prePub)) require(prePub);
  });

  async.parallelLimit(changedPackages.map(function (name) {
    return function (done) {
      var loc = getPackageLocation(name);

      child.exec("cd " + loc + " && npm publish --tag prerelease", function (err, stdout, stderr) {
        if (err || stderr) return done(err || stderr);

        console.log(stdout.trim());

        // postpublish script
        var postPub = loc + "/scripts/postpublish.js";
        if (fs.existsSync(postPub)) require(postPub);

        done();
      });
    };
  }), 1, function (err) {
    onError(err);
    ship();
  });
}

function onError(err) {
  if (!err) return;
  console.log(chalk.red("There was a problem publishing."));
  removeTag();
  console.log(err.stack || err);
  process.exit(1);
}

function ship() {
  async.parallelLimit(changedPackages.map(function (name) {
    return function (done) {
      var loc = getPackageLocation(name);
      execSync("npm dist-tag rm " + name + " prerelease", true);
      execSync("npm dist-tag add " + name + "@" + NEW_VERSION + " stable");
    };
  }), 1, function (err) {
    onError(err);
    execSync("git push", true);
    execSync("git push --tags", true);
    console.log(chalk.green("Successfully shipped " + NEW_VERSION));
    process.exit();
  });
}
