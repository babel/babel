import * as foo from 'bar';

export default class {};

// neither of these should be able to use or affect the real exports
new exports.default();
module.exports = {};
