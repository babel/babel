export default function () {
  return {
    visitor: {
      BinaryExpression(node) {
        var op = node.operator;
        if (op !== "===" && op !== "!==") return;

        var left  = this.get("left");
        var right = this.get("right");
        if (left.baseTypeStrictlyMatches(right)) {
          node.operator = node.operator.slice(0, -1);
        }
      }
    }
  };
}
