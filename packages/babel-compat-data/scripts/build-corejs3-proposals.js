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

const builtInDefinitionsPath = path.join(
  __dirname,
  "../../babel-preset-env/src/polyfills/corejs3/built-in-definitions.js"
);

const builtInDefinitions = fs.readFileSync(builtInDefinitionsPath, "utf-8");

for (const feature of finishedProposals) {
  const standardizedName = feature.replace("esnext.", "es.");
  if (!builtInDefinitions.includes(standardizedName)) {
    console.log(
      `${feature} is now standardized as ${standardizedName}, please add "${standardizedName}" to "${builtInDefinitionsPath}"`
    );
  }
}
