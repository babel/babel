const path = require("path");
const fs = require("fs");
const request = require("request");

// This mapping represents browsers who have shipped ES Modules Support.
// For more information, checkout the specifications:
// * https://www.ecma-international.org/ecma-262/6.0/#sec-modules
// * https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type
const lastKnown = {
  chrome: 61,
  firefox: 59,
  safari: 10.1,
  ios_saf: 10.3,
  edge: 16,
};

function input() {
  return new Promise(function(resolve, reject) {
    request(
      "https://raw.githubusercontent.com/Fyrd/caniuse/master/features-json/es6-module.json",
      function(error, response, body) {
        if (error || response.statusCode !== 200) {
          return reject(
            new Error(
              `Error retrieving es6-module.json. ${
                error ? error : `statusCode=${response.statusCode}`
              }`
            )
          );
        }

        try {
          const { stats } = JSON.parse(body);
          const allowedBrowsers = {};

          Object.keys(stats).forEach(browser => {
            if (browser !== "and_chr") {
              const browserVersions = stats[browser];
              const allowedVersions = Object.keys(browserVersions)
                .filter(value => {
                  return browserVersions[value] === "y";
                })
                .sort((a, b) => a - b);

              if (allowedVersions[0] !== undefined) {
                allowedBrowsers[browser] = allowedVersions[0];
              }
            }
          });

          resolve(allowedBrowsers);
        } catch (error) {
          return reject(new Error(`Error parsing es6-module.json.`));
        }
      }
    );
  });
}

function output(minVersions) {
  const dataPath = path.join(__dirname, "../data/built-in-modules.json");
  const data = {
    "es6.module": minVersions,
  };
  fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
}

Promise.resolve(input())
  .then(minVersions => output(minVersions))
  .catch(output(lastKnown));
