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
  "node",
  "ie",
  "android",
  "ios"
];

const envMap = {
  safari51: "safari5",
  safari71_8: "safari7",
  chrome: "chrome19",
  chrome19dev: "chrome19",
  chrome21dev: "chrome21",
  firefox3_5: "firefox3",
  firefox3_6: "firefox3",
  node012: "node0.12",
  node64: "node6",
  node65: "node6.5"
};

const getLowestImplementedVersion = ({ features }, env) => {
  let tests = flatten(compatibilityTests
    .filter((test) => features.indexOf(test.name) >= 0)
    .map((test) => {
      return test.subtests ?
        test.subtests.map((subtest) => ({
          name: `${test.name}/${subtest.name}`,
          res: subtest.res
        })) :
      {
        name: test.name,
        res: test.res
      };
    })
  );

  let envTests = tests
  .map(({ res: test, name }, i) => {
    return Object.keys(test)
    .filter((t) => t.startsWith(env))
    // TODO: make flagged/etc an options
    .filter((test) => tests[i].res[test] === true || tests[i].res[test] === "strict")
    // normalize some keys
    .map((test) => envMap[test] || test)
    .filter((test) => !isNaN(parseInt(test.replace(env, ""))))
    .shift();
  });

  let envFiltered = envTests.filter((t) => t);
  if (envTests.length > envFiltered.length) {
    // envTests.forEach((test, i) => {
    //   if (!test) {
    //     // print unsupported features
    //     if (env === 'node') {
    //       console.log(`ENV(${env}): ${tests[i].name}`);
    //     }
    //   }
    // });
    return null;
  }

  return envTests
  .map((str) => Number(str.replace(env, "")))
  .reduce((a, b) => { return (a < b) ? b : a; });
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
