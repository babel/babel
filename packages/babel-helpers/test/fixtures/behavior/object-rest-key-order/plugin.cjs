module.exports = function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name === "HELPER_OBJECT_REST"
          ? "objectWithoutProperties"
          : path.node.name === "HELPER_OBJECT_REST_LOOSE"
            ? "objectWithoutPropertiesLoose"
            : null;
        if (name) path.replaceWith(this.addHelper(name));
      },
    },
  };
};
