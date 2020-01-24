const path = require("path");
const fs = require("fs");

const moduleSupport = require("caniuse-db/features-json/es6-module.json");

const acceptedWithCaveats = new Set(["safari", "ios_saf"]);

const browserNameMap = {
  and_chr: "chrome",
  and_ff: "firefox",
  android: "chrome", // map to chrome here as Android WebView 61 is Chromium-based
  op_mob: "opera",
};
const { stats } = moduleSupport;

const allowedBrowsers = {};

Object.keys(stats).forEach(browser => {
  const browserName = browserNameMap[browser] || browser;
  const browserVersions = stats[browserName];
  const allowedVersions = Object.keys(browserVersions)
    .filter(value => {
      // Edge 16/17 are marked as "y #6"
      return acceptedWithCaveats.has(browserName)
        ? browserVersions[value][0] === "a"
        : browserVersions[value].startsWith("y");
    })
    .sort((a, b) => a - b);

  if (allowedVersions[0] !== undefined) {
    // Handle cases where caniuse specifies version as: "11.0-11.2"
    allowedBrowsers[browser] = allowedVersions[0].split("-")[0];
  }
});

const dataPath = path.join(__dirname, "../data/native-modules.json");
const data = {
  "es6.module": allowedBrowsers,
};
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
