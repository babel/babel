export default function () {
  return {
    visitor: {
      VariableDeclaration(path) {
        this.addHelper("set");
      },
    },
  };
}
