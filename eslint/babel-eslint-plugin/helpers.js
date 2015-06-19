var _parse = require('babel-core').parse;

module.exports = {
  parse: function(code){
    var ast = null
    try {
      ast = _parse(code, { locations: true, ranges: true }).body[0] //unwrap body
    }
    catch (err){
      console.warn(err)
    }

    return ast
  }
}