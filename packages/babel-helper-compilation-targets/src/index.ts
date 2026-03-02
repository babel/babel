import browserslist from "browserslist";
import { findSuggestion } from "@babel/helper-validator-option";
import browserModulesData from "@babel/compat-data/native-modules";

import {
  semverify,
  semverMin,
  isUnreleasedVersion,
  getLowestUnreleased,
  getHighestUnreleased,
} from "./utils";
import { OptionValidator } from "@babel/helper-validator-option";
import { browserNameMap } from "./targets";
import { TargetNames } from "./options";
import type { Targets, InputTargets, Browsers, TargetsTuple } from "./types";

export type { Targets, InputTargets };

export { prettifyTargets } from "./pretty";
export { getInclusionReasons } from "./debug";
export { default as filterItems, isRequired } from "./filter-items";
export { unreleasedLabels } from "./targets";
export { TargetNames };

const ESM_SUPPORT = browserModulesData["es6.module"];

declare const PACKAGE_JSON: { name: string; version: string };
const v = new OptionValidator(PACKAGE_JSON.name);

function validateTargetNames(targets: Targets): TargetsTuple {
  const validTargets = Object.keys(TargetNames);
  for (const target of Object.keys(targets)) {
    if (!(target in TargetNames)) {
      throw new Error(
        v.formatMessage(`'${target}' is not a valid target
- Did you mean '${findSuggestion(target, validTargets)}'?`),
      );
    }
  }

  return targets as any;
}

export function isBrowsersQueryValid(browsers: unknown): boolean {
  return (
    typeof browsers === "string" ||
    (Array.isArray(browsers) && browsers.every(b => typeof b === "string"))
  );
}

function validateBrowsers(browsers: Browsers | undefined) {
  v.invariant(
    browsers === undefined || isBrowsersQueryValid(browsers),
    `'${String(browsers)}' is not a valid browserslist query`,
  );

  return browsers;
}

function getLowestVersions(browsers: Array<string>): Targets {
  return browsers.reduce((all: any, browser: string): any => {
    const [browserName, browserVersion] = browser.split(" ");
    const normalizedBrowserName = browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      // Browser version can return as "10.0-10.2"
      const splitVersion = browserVersion.split("-")[0].toLowerCase();
      const isSplitUnreleased = isUnreleasedVersion(splitVersion, browserName);

      if (!all[normalizedBrowserName]) {
        all[normalizedBrowserName] = isSplitUnreleased
          ? splitVersion
          : semverify(splitVersion);
        return all;
      }

      const version = all[normalizedBrowserName];
      const isUnreleased = isUnreleasedVersion(version, browserName);

      if (isUnreleased && isSplitUnreleased) {
        all[normalizedBrowserName] = getLowestUnreleased(
          version,
          splitVersion,
          browserName,
        );
      } else if (isUnreleased) {
        all[normalizedBrowserName] = semverify(splitVersion);
      } else if (!isUnreleased && !isSplitUnreleased) {
        const parsedBrowserVersion = semverify(splitVersion);

        all[normalizedBrowserName] = semverMin(version, parsedBrowserVersion);
      }
    } catch (e) {}

    return all;
  }, {});
}

function outputDecimalWarning(
  decimalTargets: Array<{ target: string; value: string }>,
): void {
  if (!decimalTargets.length) {
    return;
  }

  console.warn("Warning, the following targets are using a decimal version:\n");
  decimalTargets.forEach(({ target, value }) =>
    console.warn(`  ${target}: ${value}`),
  );
  console.warn(`
We recommend using a string for minor/patch versions to avoid numbers like 6.10
getting parsed as 6.1, which can lead to unexpected behavior.
`);
}

function semverifyTarget(target, value) {
  try {
    return semverify(value);
  } catch (error) {
    throw new Error(
      v.formatMessage(
        `'${value}' is not a valid value for 'targets.${target}'.`,
      ),
    );
  }
}

const targetParserMap = {
  __default(target, value) {
    const version = isUnreleasedVersion(value, target)
      ? value.toLowerCase()
      : semverifyTarget(target, value);
    return [target, version];
  },

  // Parse `node: true` and `node: "current"` to version
  node(target, value) {
    const parsed =
      value === true || value === "current"
        ? process.versions.node
        : semverifyTarget(target, value);
    return [target, parsed];
  },
};

function generateTargets(inputTargets: InputTargets): Targets {
  const input = { ...inputTargets };
  delete input.esmodules;
  delete input.browsers;
  return input as any as Targets;
}

function resolveTargets(queries: Browsers, env?: string): Targets {
  const resolved = browserslist(queries, {
    mobileToDesktop: true,
    env,
  });
  return getLowestVersions(resolved);
}

type GetTargetsOption = {
  // This is not the path of the config file, but the path where start searching it from
  configPath?: string;
  // The path of the config file
  configFile?: string;
  // The env to pass to browserslist
  browserslistEnv?: string;
  // true to disable config loading
  ignoreBrowserslistConfig?: boolean;
};

export default function getTargets(
  inputTargets: InputTargets = {} as InputTargets,
  options: GetTargetsOption = {},
): Targets {
  let { browsers, esmodules } = inputTargets;
  const { configPath = "." } = options;

  validateBrowsers(browsers);

  const input = generateTargets(inputTargets);
  let targets: TargetsTuple = validateTargetNames(input);

  const shouldParseBrowsers = !!browsers;
  const hasTargets = shouldParseBrowsers || Object.keys(targets).length > 0;
  const shouldSearchForConfig =
    !options.ignoreBrowserslistConfig && !hasTargets;

  if (!browsers && shouldSearchForConfig) {
    browsers = browserslist.loadConfig({
      config: options.configFile,
      path: configPath,
      env: options.browserslistEnv,
    });
    if (browsers == null) {
      if (process.env.BABEL_8_BREAKING) {
        // In Babel 8, if no targets are passed, we use browserslist's defaults
        // and exclude IE 11.
        browsers = ["defaults, not ie 11"];
      } else {
        // If no targets are passed, we need to overwrite browserslist's defaults
        // so that we enable all transforms (acting like the now deprecated
        // preset-latest).
        browsers = [];
      }
    }
  }

  // `esmodules` as a target indicates the specific set of browsers supporting ES Modules.
  // These values OVERRIDE the `browsers` field.
  if (esmodules && (esmodules !== "intersect" || !browsers?.length)) {
    browsers = Object.keys(ESM_SUPPORT)
      .map(browser => `${browser} >= ${ESM_SUPPORT[browser]}`)
      .join(", ");
    esmodules = false;
  }

  if (browsers) {
    const queryBrowsers = resolveTargets(browsers, options.browserslistEnv);

    if (esmodules === "intersect") {
      for (const browser of Object.keys(queryBrowsers)) {
        const version = queryBrowsers[browser];

        if (ESM_SUPPORT[browser]) {
          queryBrowsers[browser] = getHighestUnreleased(
            version,
            semverify(ESM_SUPPORT[browser]),
            browser,
          );
        } else {
          delete queryBrowsers[browser];
        }
      }
    }

    targets = Object.assign(queryBrowsers, targets);
  }

  // Parse remaining targets
  const result: Targets = {} as Targets;
  const decimalWarnings = [];
  for (const target of Object.keys(targets).sort()) {
    const value = targets[target];

    // Warn when specifying minor/patch as a decimal
    if (typeof value === "number" && value % 1 !== 0) {
      decimalWarnings.push({ target, value });
    }

    // Check if we have a target parser?
    // $FlowIgnore - Flow doesn't like that some targetParserMap[target] might be missing
    const parser = targetParserMap[target] ?? targetParserMap.__default;
    const [parsedTarget, parsedValue] = parser(target, value);

    if (parsedValue) {
      // Merge (lowest wins)
      result[parsedTarget] = parsedValue;
    }
  }

  outputDecimalWarning(decimalWarnings);

  return result;
}
