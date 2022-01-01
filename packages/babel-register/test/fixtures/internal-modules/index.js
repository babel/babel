const register = require('../../..');

register( {
  ignore: [],
  babelrc: false,
  configFile: false,
  plugins: [require.resolve("./plugin")]
} );

console.log(
  JSON.stringify({
    convertSourceMap: require('convert-source-map').fromObject.toString()
  })
);
