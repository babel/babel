function makeVisitor(t, targetGlobal = "HandledPromise") {
  return {
    EventualMemberExpression(path) {
      const { node } = path;
      if (path.parent.type === "CallExpression") {
        // Allow rewriting call expressions to eventualCalls.
        return;
      }
      const { object, computed, property } = node;

      let targetMember;
      switch (targetGlobal) {
        case "Promise":
          targetMember = t.identifier("eventualGet");
          break;
        case "HandledPromise":
          targetMember = t.identifier("get");
          break;
        default:
        // FIXME: What to do?
      }

      const target = t.memberExpression(
        t.identifier(targetGlobal),
        targetMember,
      );

      const targs = [];
      targs.push(object);
      if (computed) {
        // Just use the computed property.
        targs.push(property);
      } else {
        // Make a literal from the name.
        targs.push(t.stringLiteral(property.name));
      }

      path.replaceWith(t.callExpression(target, targs));
    },
    CallExpression(path) {
      const { node } = path;
      const { callee, arguments: args } = node;
      const { type, object, computed, property } = callee;
      if (type !== "EventualMemberExpression") {
        return;
      }

      let targetMember;
      switch (targetGlobal) {
        case "Promise":
          targetMember = t.identifier("eventualSend");
          break;
        case "HandledPromise":
          targetMember = t.identifier("applyMethod");
          break;
        default:
        // FIXME: What to do?
      }

      const target = t.memberExpression(
        t.identifier(targetGlobal),
        targetMember,
      );

      // The arguments to our target.
      const targs = [];
      targs.push(object);
      if (computed) {
        // Just use the computed property.
        targs.push(property);
      } else {
        // Make a literal from the name.
        targs.push(t.stringLiteral(property.name));
      }
      // Add the method arguments.
      targs.push(t.arrayExpression(args));

      path.replaceWith(t.callExpression(target, targs));
    },
    EventualCallExpression(path) {
      const { node } = path;
      const { callee, arguments: args } = node;

      let targetMember;
      switch (targetGlobal) {
        case "Promise":
          targetMember = t.identifier("eventualApply");
          break;
        case "HandledPromise":
          targetMember = t.identifier("applyFunction");
          break;
        default:
        // FIXME: What to do?
      }

      const target = t.memberExpression(
        t.identifier(targetGlobal),
        targetMember,
      );

      const targs = [];
      targs.push(callee);
      targs.push(t.arrayExpression(args));

      path.replaceWith(t.callExpression(target, targs));
    },
  };
}

export default makeVisitor;
