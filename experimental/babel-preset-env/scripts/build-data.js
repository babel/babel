const fs = require("fs");
const path = require("path");

const flatten = require("lodash/flatten");
const flattenDeep = require("lodash/flattenDeep");
const naturalCompare = require("natural-compare");
const pluginFeatures = require("../data/pluginFeatures");

const renameTests = (tests, getName) =>
  tests.map((test) => Object.assign({}, test, { name: getName(test.name) }));

const compatibilityTests = flattenDeep([
  require("compat-table/data-es6"),
  require("compat-table/data-es2016plus"),
].map((data) =>
  data.tests.map((test) => {
    return test.subtests ?
      [test, renameTests(test.subtests, (name) => test.name + " / " + name)] :
      test;
  })
));

const versions = Object.keys(require("compat-table/data-es6").browsers)
  .sort(naturalCompare);

const environments = [
  "chrome",
  "edge",
  "firefox",
  "safari",
];

const getLowestImplementedVersion = ({ features }, env) => {
  let tests = flatten(compatibilityTests
    .filter((test) => features.indexOf(test.name) >= 0)
    .map((test) => {
      return test.subtests ?
        test.subtests.map((subtest) => subtest.res) :
        test.res;
    })
  );

  const envVersions = versions.filter((version) => version.startsWith(env));

  for (let i = 0; i < envVersions.length; i++) {
    const version = envVersions[i];
    tests = tests.filter((test) =>
      test[version] !== true &&
      test[version] !== "strict"
    );
    if (tests.length === 0) {
      const number = parseInt(version.replace(env, ""), 10);
      return isFinite(number) ? number : null;
    }
  }
  return null;
};

const data = {};
for (const pluginName in pluginFeatures) {
  const options = pluginFeatures[pluginName];
  const plugin = {};
  environments.forEach((env) => {
    if (Array.isArray(options.features)) {
      const version = getLowestImplementedVersion(options, env);
      if (version !== null) {
        plugin[env] = version;
      }
    }
  });
  data[pluginName] = plugin;
}

fs.writeFileSync(
  path.join(__dirname, "../data/plugins.json"),
  JSON.stringify(data, null, 2) + "\n"
);
