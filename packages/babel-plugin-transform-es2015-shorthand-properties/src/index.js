export default function () {
  return {
    visitor: {
      Property({ node }) {
        if (node.method) {
          node.method = false;
        }

        if (node.shorthand) {
          node.shorthand = false;
        }
      }
    }
  };
}
