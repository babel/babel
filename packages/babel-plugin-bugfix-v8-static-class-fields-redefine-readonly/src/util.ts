import { types as t, type NodePath, type Visitor } from "@babel/core";

function isNameOrLength(key: t.Node): boolean {
  if (t.isIdentifier(key)) {
    return key.name === "name" || key.name === "length";
  }
  if (t.isStringLiteral(key)) {
    return key.value === "name" || key.value === "length";
  }
  return false;
}

function isStaticFieldWithValue(
  node: t.Node,
): node is t.ClassProperty | t.ClassPrivateProperty {
  return (
    (t.isClassProperty(node) || t.isClassPrivateProperty(node)) &&
    node.static &&
    !!node.value
  );
}

const hasReferenceVisitor: Visitor<{ name: string; ref: () => void }> = {
  ReferencedIdentifier(path, state) {
    if (path.node.name === state.name) {
      state.ref();
      path.stop();
    }
  },
  Scope(path, { name }) {
    if (path.scope.hasOwnBinding(name)) {
      path.skip();
    }
  },
};

function isReferenceOrThis(node: t.Node, name?: string) {
  return t.isThisExpression(node) || (name && t.isIdentifier(node, { name }));
}

const hasReferenceOrThisVisitor: Visitor<{ name?: string; ref: () => void }> = {
  "ThisExpression|ReferencedIdentifier"(path, state) {
    if (isReferenceOrThis(path.node, state.name)) {
      state.ref();
      path.stop();
    }
  },
  FunctionParent(path, state) {
    if (path.isArrowFunctionExpression()) return;
    if (state.name && !path.scope.hasOwnBinding(state.name)) {
      path.traverse(hasReferenceVisitor, state);
    }
    path.skip();
    if (path.isMethod()) {
      if (
        process.env.BABEL_8_BREAKING ||
        USE_ESM ||
        IS_STANDALONE ||
        path.requeueComputedKeyAndDecorators
      ) {
        path.requeueComputedKeyAndDecorators();
      } else {
        // eslint-disable-next-line no-restricted-globals
        require("@babel/traverse").NodePath.prototype.requeueComputedKeyAndDecorators.call(
          path,
        );
      }
    }
  },
};

type ClassElementWithComputedKeySupport = Extract<
  t.ClassBody["body"][number],
  { computed?: boolean }
>;

/**
 * This function returns an array containing the indexes of class elements
 * that might be affected by https://crbug.com/v8/12421 bug.
 *
 * This bug affects public static class fields that have the same name as an
 * existing non-writable property with the same name. This usually happens when
 * the static field is named 'length' or 'name', since it clashes with the
 * predefined fn.length and fn.name properties. We must also compile static
 * fields with computed key, because they might end up being named 'length' or
 * 'name'.
 *
 * However, this bug can potentially affect public static fields with any name.
 * Consider this example:
 *
 *     class A {
 *       static {
 *         Object.defineProperty(A, "readonly", {
 *           value: 1,
 *           writable: false,
 *           configurable: true
 *         })
 *       }
 *
 *       static readonly = 2;
 *     }
 *
 * When initializing the 'static readonly' field, the class already has a
 * non-writable property named 'readonly' and thus V8 9.7 incorrectly throws.
 *
 * To avoid unconditionally compiling every public static field, we track how
 * the class is referenced during definition & static evaluation: any side
 * effect after a reference to the class can potentially define a non-writable
 * conficting property, so subsequent public static fields must be compiled.
 * The class could be referenced using the class name in computed keys, which
 * run before static fields, or using either the class name or 'this' in static
 * fields (both public and private) and static blocks.
 *
 * We don't need to check if computed keys referencing the class have any side
 * effect, because during the computed keys evaluation the internal class
 * binding is in TDZ. However, the first side effect in a static field/block
 * could have access to a function defined in a computed key that modifies the
 * class.
 *
 * This logic is already quite complex, so we assume that static blocks always
 * have side effects and reference the class (the reason to use them is to
 * perform additional initialization logic on the class anyway), so that we do
 * not have to check their contents.
 */
export function getPotentiallyBuggyFieldsIndexes(path: NodePath<t.Class>) {
  const buggyPublicStaticFieldsIndexes: number[] = [];

  let classReferenced = false;
  const className = path.node.id?.name;

  const hasReferenceState = {
    name: className,
    ref: () => (classReferenced = true),
  };

  if (className) {
    for (const el of path.get("body.body")) {
      if ((el.node as ClassElementWithComputedKeySupport).computed) {
        // Since .traverse skips the top-level node, it doesn't detect
        // a reference happening immediately:
        //     class A { [A]() {} }
        // However, it's a TDZ error so it's ok not to consider this case.
        (el as NodePath<ClassElementWithComputedKeySupport>)
          .get("key")
          .traverse(hasReferenceVisitor, hasReferenceState);

        if (classReferenced) break;
      }
    }
  }

  let nextPotentiallyBuggy = false;

  const { body } = path.node.body;
  for (let i = 0; i < body.length; i++) {
    const node = body[i];

    if (!nextPotentiallyBuggy) {
      if (t.isStaticBlock(node)) {
        classReferenced = true;
        nextPotentiallyBuggy = true;
      } else if (isStaticFieldWithValue(node)) {
        if (!classReferenced) {
          if (isReferenceOrThis(node.value, className)) {
            classReferenced = true;
          } else {
            (
              path.get(`body.body.${i}.value`) as NodePath<t.Expression>
            ).traverse(hasReferenceOrThisVisitor, hasReferenceState);
          }
        }

        if (classReferenced) {
          nextPotentiallyBuggy = !path.scope.isPure(node.value);
        }
      }
    }

    if (
      t.isClassProperty(node, { static: true }) &&
      (nextPotentiallyBuggy || node.computed || isNameOrLength(node.key))
    ) {
      buggyPublicStaticFieldsIndexes.push(i);
    }
  }

  return buggyPublicStaticFieldsIndexes;
}

export function getNameOrLengthStaticFieldsIndexes(path: NodePath<t.Class>) {
  const indexes: number[] = [];

  const { body } = path.node.body;
  for (let i = 0; i < body.length; i++) {
    const node = body[i];
    if (
      t.isClassProperty(node, { static: true, computed: false }) &&
      isNameOrLength(node.key)
    ) {
      indexes.push(i);
    }
  }

  return indexes;
}

type Range = [start: number, end: number];

/**
 * Converts a sorted list of numbers into a list of (inclusive-exclusive)
 * ranges representing the same numbers.
 *
 * @example toRanges([1, 3, 4, 5, 8, 9]) -> [[1, 2], [3, 6], [8, 10]]
 */
export function toRanges(nums: number[]): Range[] {
  const ranges: Range[] = [];

  if (nums.length === 0) return ranges;

  let start = nums[0];
  let end = start + 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      throw new Error("Internal Babel error: nums must be in ascending order");
    }
    if (nums[i] === end) {
      end++;
    } else {
      ranges.push([start, end]);
      start = nums[i];
      end = start + 1;
    }
  }
  ranges.push([start, end]);

  return ranges;
}
