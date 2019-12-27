const data = require("core-js-compat/data.json");
const fs = require("fs");
const path = require("path");

const features = Object.keys(data);

const shippedProposals = features.filter(feature => {
  return feature.startsWith("esnext.") && Object.keys(data[feature]).length > 0;
});

fs.writeFileSync(
  path.join(__dirname, "../data/corejs3-shipped-proposals.json"),
  JSON.stringify(shippedProposals, undefined, 2) + "\n"
);

const finishedProposals = shippedProposals.filter(feature => {
  return features.includes(feature.replace("esnext.", "es."));
});

const builtInDefinitions = fs.readFileSync(
  path.join(__dirname, "../src/polyfills/corejs3/built-in-definitions.js"),
  "utf-8"
);

for (const feature of finishedProposals) {
  const standarizedName = feature.replace("esnext.", "es.");
  if (!builtInDefinitions.includes(standarizedName)) {
    console.log(
      `${feature} is now standarized as ${standarizedName}, please add "${standarizedName}" to src/polyfills/corejs3/built-in-definitions`
    );
  }
}
