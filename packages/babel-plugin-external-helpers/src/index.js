export default function ({ types: t }) {
  return {
    name: "babel-plugin-external-helpers",

    pre(file) {
      file.set("helpersNamespace", t.identifier("babelHelpers"));
    }
  };
}
