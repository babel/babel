// @flow

import browserslist from "browserslist";
import semver from "semver";
import { semverify, isUnreleasedVersion, getLowestUnreleased } from "./utils";
import { objectToBrowserslist } from "./normalize-options";
import type { Targets } from "./types";

const browserNameMap = {
  android: "android",
  chrome: "chrome",
  and_chr: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ios_saf: "ios",
  safari: "safari",
};

const isBrowsersQueryValid = (browsers: string | Array<string>): boolean =>
  typeof browsers === "string" || Array.isArray(browsers);

export const semverMin = (first: ?string, second: string): string => {
  return first && semver.lt(first, second) ? first : second;
};

const mergeBrowsers = (fromQuery: Targets, fromTarget: Targets) => {
  return Object.keys(fromTarget).reduce((queryObj, targKey) => {
    if (targKey !== "browsers") {
      queryObj[targKey] = fromTarget[targKey];
    }
    return queryObj;
  }, fromQuery);
};

const getLowestVersions = (browsers: Array<string>): Targets => {
  return browsers.reduce((all: Object, browser: string): Object => {
    const [browserName, browserVersion] = browser.split(" ");
    const normalizedBrowserName = browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      // Browser version can return as "10.0-10.2"
      const splitVersion = browserVersion.split("-")[0].toLowerCase();

      if (isUnreleasedVersion(splitVersion, browserName)) {
        all[normalizedBrowserName] = getLowestUnreleased(
          all[normalizedBrowserName],
          splitVersion,
          browserName,
        );
      }

      const parsedBrowserVersion = semverify(splitVersion);

      all[normalizedBrowserName] = semverMin(
        all[normalizedBrowserName],
        parsedBrowserVersion,
      );
    } catch (e) {}

    return all;
  }, {});
};

const outputDecimalWarning = (decimalTargets: Array<Object>): void => {
  if (!decimalTargets || !decimalTargets.length) {
    return;
  }

  console.log("Warning, the following targets are using a decimal version:");
  console.log("");
  decimalTargets.forEach(({ target, value }) =>
    console.log(`  ${target}: ${value}`),
  );
  console.log("");
  console.log(
    "We recommend using a string for minor/patch versions to avoid numbers like 6.10",
  );
  console.log("getting parsed as 6.1, which can lead to unexpected behavior.");
  console.log("");
};

const targetParserMap = {
  __default: (target, value) => {
    const version = isUnreleasedVersion(value, target)
      ? value.toLowerCase()
      : semverify(value);
    return [target, version];
  },

  // Parse `node: true` and `node: "current"` to version
  node: (target, value) => {
    const parsed =
      value === true || value === "current"
        ? process.versions.node
        : semverify(value);

    return [target, parsed];
  },
};

type ParsedResult = {
  targets: Targets,
  decimalWarnings: Array<Object>,
};
const getTargets = (targets: Object = {}, options: Object = {}): Targets => {
  const targetOpts: Targets = {};
  // Parse browsers target via browserslist;
  const queryIsValid = isBrowsersQueryValid(targets.browsers);
  const browsersquery = queryIsValid ? targets.browsers : null;
  if (queryIsValid || !options.ignoreBrowserslistConfig) {
    browserslist.defaults = objectToBrowserslist(targets);

    const browsers = browserslist(browsersquery, { path: options.configPath });
    const queryBrowsers = getLowestVersions(browsers);
    targets = mergeBrowsers(queryBrowsers, targets);
  }
  // Parse remaining targets
  const parsed = Object.keys(targets)
    .sort()
    .reduce(
      (results: ParsedResult, target: string): ParsedResult => {
        if (target !== "browsers") {
          const value = targets[target];

          // Warn when specifying minor/patch as a decimal
          if (typeof value === "number" && value % 1 !== 0) {
            results.decimalWarnings.push({ target, value });
          }

          // Check if we have a target parser?
          const parser = targetParserMap[target] || targetParserMap.__default;
          const [parsedTarget, parsedValue] = parser(target, value);

          if (parsedValue) {
            // Merge (lowest wins)
            results.targets[parsedTarget] = parsedValue;
          }
        }

        return results;
      },
      {
        targets: targetOpts,
        decimalWarnings: [],
      },
    );

  outputDecimalWarning(parsed.decimalWarnings);

  return parsed.targets;
};

export default getTargets;
