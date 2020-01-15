/*

Each entry must be in the following format:

type PluginData = {
  replaces: string,
  features: [...nameOfCompatTableFeature]
}

targets is merged with the data from features, and has the precedence.

*/

module.exports = {
  "bugfix/transform-edge-default-parameters": {
    replaces: "transform-parameters",
    features: [
      "destructuring, parameters / shorthand defaults, arrow function",
    ],
  },
};
