const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const template = require("@babel/template").default;
const helpers = require("../../lib/helpers.js").default;

function getHelperId(dir, name) {
  const testName = path.basename(dir);
  return `_$_${testName}_${name}`;
}

module.exports = function defineHelper(dir, name, code) {
  const id = getHelperId(dir, name);
  if (id in helpers) {
    throw new Error(`The ${id} helper is already defined.`);
  }
  Object.defineProperty(helpers, id, {
    value: {
      minVersion: "7.0.0-beta.0",
      ast: template.program(code),
    },
  });
  return id;
};
