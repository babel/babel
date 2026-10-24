import { parseSync, traverse, types as t } from "@babel/core";
import { buildObjectExcludingKeys } from "../lib/index.js";

function getProgramScope() {
  let scope;
  traverse(parseSync("", { configFile: false }), {
    Program(path) {
      scope = path.scope;
    },
  });
  return scope;
}

const addHelper = name => t.identifier(`_${name}`);

describe("buildObjectExcludingKeys", () => {
  it("reuses the object reference node once, and clones it afterwards", () => {
    const objRef = t.identifier("obj");
    const node = buildObjectExcludingKeys(
      [],
      objRef,
      getProgramScope(),
      addHelper,
      false,
    );
    // _objectWithoutProperties(_extends(Object.create(null),
    //   (_objectDestructuringEmpty(obj), obj)), [])
    const [check, ref] = node.arguments[0].arguments[1].expressions;
    expect(check.arguments[0]).toBe(objRef);
    expect(ref).not.toBe(objRef);
    expect(ref).toEqual(objRef);
  });

  it("calls the object reference factory for each use", () => {
    const factory = jest.fn(() => t.identifier("obj"));
    buildObjectExcludingKeys([], factory, getProgramScope(), addHelper, false);
    expect(factory).toHaveBeenCalledTimes(2);
  });

  it("excludes the given keys", () => {
    const node = buildObjectExcludingKeys(
      [
        { key: t.identifier("a"), computed: false },
        { key: t.booleanLiteral(true), computed: true, primitive: true },
        { key: t.nullLiteral(), computed: true, primitive: true },
      ],
      t.identifier("obj"),
      getProgramScope(),
      addHelper,
      false,
    );
    expect(node.callee.name).toBe("_objectWithoutProperties");
    expect(node.arguments[1].elements.map(el => el.value)).toEqual([
      "a",
      "true",
      "null",
    ]);
  });
});
