module.exports = {
  "comments": false,
  "presets": [
    [
      "env",
      {
        "loose": true
      }
    ],
    "stage-0",
    "flow"
  ],
  "env": {
    "cov": {
      "auxiliaryCommentBefore": "istanbul ignore next",
      "plugins": [
        "istanbul"
      ]
    }
  }
};
