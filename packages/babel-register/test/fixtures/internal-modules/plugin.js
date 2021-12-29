// Plugin to add '/* transformed */' comment to start of function bodies

module.exports = () => ( {
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
