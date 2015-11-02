export default function () {
  return {
    visitor: {
      BinaryExpression(path) {
        let { node } = path;

        let op = node.operator;
        if (op !== "===" && op !== "!==") return;

        let left  = path.get("left");
        let right = path.get("right");
        if (left.baseTypeStrictlyMatches(right)) {
          node.operator = node.operator.slice(0, -1);
        }
      }
    }
  };
}
