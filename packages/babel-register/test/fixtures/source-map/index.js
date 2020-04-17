const { retrieveSourceMap } = require('source-map-support');

const path = require.resolve('./foo/bar');

require('./foo/bar');

console.log(JSON.stringify(retrieveSourceMap(path)));
