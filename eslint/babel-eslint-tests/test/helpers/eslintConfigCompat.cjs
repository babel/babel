const eslint = require("eslint");
const babelESLintParserPath = require.resolve("../../../babel-eslint-parser");
/**
 * Convert ESLint 9 config to ESLint 7/8 config
 * @param {eslint.Linter.FlatConfig} ESLint 9 config
 */
function eslintConfigCompatTo8(config) {
  const newConfig = { ...config };
  const { languageOptions } = config;
  if (languageOptions) {
    const { parser, parserOptions, globals: globalsOption } = languageOptions;
    if (parser) {
      newConfig.parser = babelESLintParserPath;
    }
    if (parserOptions) {
      newConfig.parserOptions = languageOptions.parserOptions;
    }
    if (globalsOption) {
      const env = {};
      if (globalsOption.__dirname === false) {
        env.node = true;
      }
      if (globalsOption.Promise === false) {
        env.es2015 = true;
      }
      newConfig.env = env;
    }
    delete newConfig.languageOptions;
  }
  return newConfig;
}

function eslintConfigCompat(config) {
  if (parseInt(eslint.ESLint.version, 10) <= 8) {
    return eslintConfigCompatTo8(config);
  }
  return config;
}

module.exports.babelESLintParserPath = babelESLintParserPath;

module.exports.eslintConfigCompat = eslintConfigCompat;
