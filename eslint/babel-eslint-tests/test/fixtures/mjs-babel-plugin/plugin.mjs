import parser from "@babel/parser";

export default async function () {
  await Promise.resolve();

  return {
    plugin: {
      visitor: {
        StringLiteral(path) {
          path.replaceWithSourceString("foo");
        }
      }
    }
  };

};
