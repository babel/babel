import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";

export default function() {
  return {
    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addHelper("asyncToGenerator"),
        });
      },
    },
  };
}
