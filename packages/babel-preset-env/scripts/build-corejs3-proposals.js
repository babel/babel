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

fs.writeFileSync(
  path.join(__dirname, "../data/corejs3-finished-proposals.json"),
  JSON.stringify(finishedProposals, undefined, 2) + "\n"
);
