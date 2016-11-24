const fs = require("fs");
const path = require("path");

const flatten = require("lodash/flatten");
const flattenDeep = require("lodash/flattenDeep");
const pluginFeatures = require("../data/pluginFeatures");

const renameTests = (tests, getName) =>
  tests.map((test) => Object.assign({}, test, { name: getName(test.name) }));

const es6Data = require("compat-table/data-es6");
const es6PlusData = require("compat-table/data-es2016plus");
const envs = require("compat-table/environments");

const invertedEqualsEnv = Object.keys(envs)
  .filter((b) => envs[b].equals)
  .reduce((a, b) => {
    a[envs[b].equals] = b;
    return a;
  }, {});

const compatibilityTests = flattenDeep([
  es6Data,
  es6PlusData,
].map((data) =>
  data.tests.map((test) => {
    return test.subtests ?
      [test, renameTests(test.subtests, (name) => test.name + " / " + name)] :
      test;
  })
));

const environments = [
  "chrome",
  "opera",
  "edge",
  "firefox",
  "safari",
  "node",
  "ie",
  "android",
  "ios",
  "phantom"
];

const envMap = {
  safari51: "safari5",
  safari71_8: "safari7",
  firefox3_5: "firefox3",
  firefox3_6: "firefox3",
  node010: "node0.10",
  node012: "node0.12",
  iojs: "node3.3",
  node64: "node6",
  node65: "node6.5",
  android40: "android4.0",
  android41: "android4.1",
  android42: "android4.2",
  android43: "android4.3",
  android44: "android4.4",
  android50: "android5.0",
  android51: "android5.1",
  ios51: "ios5.1",
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

    // `equals` in compat-table
    Object.keys(test).forEach((t) => {
      test[invertedEqualsEnv[t]] = test[t];
      // add opera
      if (t.startsWith("chrome")) {
        let opera = parseInt(t.replace("chrome", "")) - 13;
        test[`opera${opera}`] = test[t];
      }
    });

    return Object.keys(test)
    .filter((t) => t.startsWith(env))
    // Babel assumes strict mode
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
