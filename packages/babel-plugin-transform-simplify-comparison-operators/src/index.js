export default function () {
  return {
    visitor: {
      BinaryExpression(node) {
        let op = node.operator;
        if (op !== "===" && op !== "!==") return;

        let left  = this.get("left");
        let right = this.get("right");
        if (left.baseTypeStrictlyMatches(right)) {
          node.operator = node.operator.slice(0, -1);
        }
      }
    }
  };
}
