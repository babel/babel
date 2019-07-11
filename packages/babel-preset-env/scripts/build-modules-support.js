const path = require("path");
const fs = require("fs");

const skipList = new Set(["android", "samsung"]);

function generateData({ stats }, acceptedWithCaveats) {
  const support = {};

  Object.keys(stats).forEach(browser => {
    if (!skipList.has(browser)) {
      const browserVersions = stats[browser];
      const allowedVersions = Object.keys(browserVersions)
        .filter(version => {
          const supported = browserVersions[version];
          if (
            acceptedWithCaveats &&
            acceptedWithCaveats.has(browser) &&
            supported.startsWith("a")
          ) {
            return true;
          }
          return supported.startsWith("y");
        })
        .sort((a, b) => a - b);

      if (allowedVersions[0] !== undefined) {
        // Handle cases where caniuse specifies version as: "11.0-11.2"
        support[browser] = allowedVersions[0].split("-")[0];
      }
    }
  });

  return support;
}

const dataPath = path.join(__dirname, "../data/built-in-modules.json");
const data = {
  "es6.module": generateData(
    require("caniuse-db/features-json/es6-module.json"),
    new Set(["safari", "ios_saf"])
  ),
  "dynamic-import": generateData(
    require("caniuse-db/features-json/es6-module-dynamic-import.json")
  ),
};
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
