const register = require('../../..');

// Plugin to add '/* transformed */' comment to start of function bodies
const plugin = () => ( {
  visitor: {
    Function(path) {
      const bodyNode = path.node.body;
      (bodyNode.leadingComments || (bodyNode.leadingComments = [])).push( {
        type: 'CommentBlock',
        value: ' transformed '
      } );
    },
  },
} );

register( {
  ignore: [],
  babelrc: false,
  configFile: false,
  plugins: [plugin]
} );

console.log(
  JSON.stringify({
    convertSourceMap: require('convert-source-map').fromObject.toString()
  })
);
