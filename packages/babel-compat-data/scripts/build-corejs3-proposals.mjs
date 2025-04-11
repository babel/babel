import data from "core-js-compat/data.json" with { type: "json" };
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const features = Object.keys(data);

const shippedProposals = features.filter(feature => {
  return feature.startsWith("esnext.") && Object.keys(data[feature]).length > 0;
});

fs.writeFileSync(
  new URL("../data/corejs3-shipped-proposals.json", import.meta.url),
  JSON.stringify(shippedProposals, undefined, 2) + "\n"
);

const finishedProposals = shippedProposals.filter(feature => {
  return features.includes(feature.replace("esnext.", "es."));
});

const builtinDefinitionsURL = new URL(
  "../../babel-preset-env/src/polyfills/corejs3/built-in-definitions.js",
  import.meta.url
);

const builtInDefinitions = fs.readFileSync(builtinDefinitionsURL, "utf-8");

for (const feature of finishedProposals) {
  const standardizedName = feature.replace("esnext.", "es.");
  if (!builtInDefinitions.includes(standardizedName)) {
    console.log(
      `${feature} is now standardized as ${standardizedName}, please add "${standardizedName}" to "${fileURLToPath(builtinDefinitionsURL)}"`
    );
  }
}
