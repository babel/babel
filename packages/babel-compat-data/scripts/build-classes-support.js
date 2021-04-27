const fs = require("fs");
const path = require("path");
const compatData = require("@mdn/browser-compat-data").javascript;
const { process } = require("./build-modules-support");
const dataPath = path.join(
  __dirname,
  "../../babel-helper-create-class-features-plugin/data/compat.json"
);
const data = {
  public_class_fields: process(compatData.classes.public_class_fields),
};
fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
