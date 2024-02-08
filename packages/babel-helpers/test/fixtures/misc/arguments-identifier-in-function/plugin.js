export default function () {
  return {
    visitor: {
      Program(path, file) {
        file.addHelper("assertClassBrand");
      },
    },
  };
}
