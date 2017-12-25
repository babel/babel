"use strict"
const babelEslint = require("../..")

// Apply monkeypatch to eslint-scope.
babelEslint.parse("var x = 0;")
