const { createRequire } = require('module');
const register = require('../../..').default;

register( {
  ignore: [],
  babelrc: false,
  configFile: false,
  plugins: [require.resolve("./plugin")]
} );

// Load the same copy of convert-source-map that @babel/core uses
const coreRequire = createRequire(require.resolve('@babel/core'));

console.log(
  JSON.stringify({
    convertSourceMap: coreRequire('convert-source-map').fromObject.toString()
  })
);
