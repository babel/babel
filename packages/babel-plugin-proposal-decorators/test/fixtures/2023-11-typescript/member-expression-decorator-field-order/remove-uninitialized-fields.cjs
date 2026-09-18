// Simulate a later transform removing an uninitialized field after
// decorators have attached evaluation work to it.
module.exports = () => ({
  visitor: {
    ClassProperty(path) {
      if (path.node.value == null) path.remove();
    },
  },
});
