const path = require("path");
const fs = require("fs");

const moduleSupport = require("caniuse-db/features-json/es6-module.json");

const acceptedWithCaveats = {
  safari: true,
  ios_saf: true,
};

const { stats } = moduleSupport;

const allowedBrowsers = {};

Object.keys(stats).forEach(browser => {
  if (browser !== "and_chr") {
    const browserVersions = stats[browser];
    const allowedVersions = Object.keys(browserVersions)
      .filter(value => {
        return acceptedWithCaveats[browser]
          ? browserVersions[value][0] === "a"
          : browserVersions[value] === "y";
      })
      .sort((a, b) => a - b);

    if (allowedVersions[0] !== undefined) {
      // Handle cases where caniuse specifies version as: "11.0-11.2"
      allowedBrowsers[browser] = allowedVersions[0].split("-")[0];
    }
  }
});

const dataPath = path.join(__dirname, "../data/built-in-modules.json");
const data = {
  "es6.module": allowedBrowsers,
};
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
