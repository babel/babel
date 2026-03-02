await Promise.resolve(0);

export default function plugin({ types: t }) {
  return {
    visitor: {
      Program(path) {
        path.pushContainer("body", t.stringLiteral("success"));
      },
    },
  };
}
