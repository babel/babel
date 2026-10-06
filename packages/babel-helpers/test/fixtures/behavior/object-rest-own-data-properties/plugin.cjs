module.exports = function () {
  return {
    visitor: {
      Identifier(path) {
        const helper = path.node.name === "COPY_REST"
          ? "objectWithoutProperties"
          : path.node.name === "COPY_REST_LOOSE"
            ? "objectWithoutPropertiesLoose"
            : null;
        if (helper) path.replaceWith(this.addHelper(helper));
      },
    },
  };
};
