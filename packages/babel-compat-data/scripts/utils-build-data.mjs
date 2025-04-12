import fs from "node:fs";
import { addElectronSupportFromChromium } from "./chromium-to-electron.mjs";

import envs from "../build/compat-table/environments.json" with { type: "json" };
import parseEnvsVersions from "../build/compat-table/build-utils/parse-envs-versions.js";
import interpolateAllResults from "../build/compat-table/build-utils/interpolate-all-results.js";
import compareVersions from "../build/compat-table/build-utils/compare-versions.js";
import legacyPluginAliases from "./data/legacy-plugin-aliases.mjs";

import * as es5CompatSources from "../build/compat-table/data-es5.js";
import * as es6CompatSources from "../build/compat-table/data-es6.js";
import * as es2016PlusCompatSources from "../build/compat-table/data-es2016plus.js";
import * as esnextCompatSources from "../build/compat-table/data-esnext.js";

const envsVersions = parseEnvsVersions(envs);

const compatSources = [
  es5CompatSources,
  es6CompatSources,
  es2016PlusCompatSources,
  esnextCompatSources,
].map(data => {
  interpolateAllResults(data.tests, envs);
  return data;
});

// End of compat-table code adaptation

export const environments = [
  "chrome",
  "opera",
  "edge",
  "firefox",
  "safari",
  "node",
  "deno",
  "ie",
  "android",
  "ios",
  "phantom",
  "samsung",
  "rhino",
  "opera_mobile",
];

const compatibilityTests = compatSources.flatMap(data =>
  data.tests.flatMap(test => {
    if (!test.subtests) return test;

    return test.subtests.map(subtest =>
      Object.assign({}, subtest, {
        name: test.name + " / " + subtest.name,
        group: test.name,
      })
    );
  })
);

const getLowestImplementedVersion = (
  { features },
  env,
  exclude = () => false
) => {
  const tests = compatibilityTests.filter(test => {
    let ok = features.includes(test.name);
    ok ||= test.group && features.includes(test.group);
    ok ||= features.length === 1 && test.name.startsWith(features[0]);
    ok &&= !exclude(test.name);
    return ok;
  });

  const envTests = tests.map(({ res }) => {
    const versions = envsVersions[env];
    let i = versions.length - 1;

    // Find the last not-implemented version
    for (; i >= 0; i--) {
      const { id } = versions[i];
      // Babel assumes strict mode
      if (res[id] !== true && res[id] !== "strict") {
        break;
      }
    }

    return envsVersions[env][i + 1];
  });

  if (envTests.length === 0 || envTests.some(t => !t)) return null;

  const result = envTests.reduce((a, b) => {
    return compareVersions(a, b) > 0 ? a : b;
  });

  // NOTE(bng): A number of environments in compat-table changed to
  // include a trailing zero (node10 -> node10_0), so for now stripping
  // it to be consistent
  return result.version.join(".").replace(/\.0$/, "");
};

const expandFeatures = features =>
  features.flatMap(feat => {
    if (feat.includes("/")) return [feat];
    return compatibilityTests
      .map(test => test.name)
      .filter(name => name === feat || name.startsWith(feat + " / "));
  });

export function generateData(environments, features) {
  const data = {};

  const normalized = {};
  for (const [key, options] of Object.entries(features)) {
    if (options.overwrite) {
      if (!options.replaces || options.features) {
        throw new Error(
          `.overwrite is only supported when using .replace and not defining .features (${key})`
        );
      }
      options.features = features[options.replaces].features;
    }
    if (!options.features) {
      normalized[key] = {
        features: expandFeatures([options]),
      };
    } else {
      normalized[key] = {
        ...options,
        features: expandFeatures(options.features),
      };
    }
  }

  const overlapping = {};

  // Apply bugfixes
  for (const [key, { features, replaces, overwrite }] of Object.entries(
    normalized
  )) {
    if (replaces) {
      if (normalized[replaces].replaces) {
        throw new Error(`Transitive replacement is not supported (${key})`);
      }

      if (overwrite) {
        normalized[key] = {
          features: normalized[replaces].features,
          overwrite,
        };
      } else {
        normalized[replaces].features = normalized[replaces].features.filter(
          feat => !features.includes(feat)
        );
      }

      if (!overlapping[replaces]) overlapping[replaces] = [];
      overlapping[replaces].push(key);
    }
  }

  for (const [key, options] of Object.entries(normalized)) {
    const plugin = {};

    environments.forEach(env => {
      const version = getLowestImplementedVersion(options, env);
      if (version) plugin[env] = version;
    });
    addElectronSupportFromChromium(plugin);

    if (options.overwrite) Object.assign(plugin, options.overwrite);

    data[key] = plugin;
  }

  return { data, overlapping };
}

export function writeFile(data, dataPath, name) {
  const stringified = JSON.stringify(data, null, 2) + "\n";
  if (process.env.CHECK_COMPAT_DATA) {
    const currentData = fs.readFileSync(dataPath, "utf8");

    // Compare as JSON strings to also check keys ordering
    if (currentData !== stringified) {
      console.error(
        `The newly generated ${name} data does not match the current files. Re-run \`make build-compat-data\`.`
      );

      return false;
    }
  } else {
    fs.writeFileSync(dataPath, stringified);
  }
  return true;
}

// TODO(Babel 8): Remove this.
// Since these scripts generates different compat data files, we generate
// Babel 7 files also when BABEL_8_BREAKING to avoid diffs during development.
// It's safe to do so because the Babel 7 data is a superset of the Babel 8
// data, so it works with both versions.
// When BABEL_8_BREAKING and IS_PUBLISHING are both true, we generate
// the actual Babel 8 files so that:
// - we don't accidentally release Babel 8 with the Babel 7 file
// - at lest in our e2e tests, we use the new file
export function babel7Only(fn, arg) {
  if (process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH) {
    return arg;
  } else {
    return fn(arg);
  }
}

// TODO(Babel 8): Remove this.
export const maybeDefineLegacyPluginAliases = babel7Only.bind(
  null,
  function (data) {
    // We create a new object to inject legacy aliases in the correct
    // order, rather than all at the end.
    const result = {};
    for (const key in data) {
      result[key] = data[key];
      if (key in legacyPluginAliases) {
        result[legacyPluginAliases[key]] = data[key];
      }
    }
    return result;
  }
);
