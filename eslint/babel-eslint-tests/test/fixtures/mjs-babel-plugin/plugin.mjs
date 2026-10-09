export default async function () {
  await Promise.resolve();

  return {
    visitor: {
      StringLiteral(path) {
        path.replaceWithSourceString("foo");
      }
    }
  };
};
