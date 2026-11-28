import { transformSync, types as t } from "@babel/core";
import transformClassProperties from "../lib/index.js";

describe("scope information of the inserted nodes", () => {
  function getScopeErrors(code) {
    const errors = [];
    transformSync(code, {
      configFile: false,
      sourceType: "module",
      plugins: [
        transformClassProperties,
        () => ({
          visitor: {
            Program: {
              exit(program) {
                program.traverse({
                  VariableDeclarator(path) {
                    for (const name of Object.keys(
                      path.getBindingIdentifiers(),
                    )) {
                      if (!path.scope.getBinding(name)) {
                        errors.push(`'${name}' is not declared`);
                      }
                    }
                  },
                  ClassDeclaration(path) {
                    const { name } = path.node.id;
                    if (!path.parentPath.scope.getBinding(name)) {
                      errors.push(`'${name}' is not declared`);
                    }
                  },
                  AssignmentExpression(path) {
                    for (const name of Object.keys(
                      t.getAssignmentIdentifiers(path.node),
                    )) {
                      const binding = path.scope.getBinding(name);
                      if (
                        binding &&
                        !binding.constantViolations.some(
                          v => v.node === path.node,
                        )
                      ) {
                        errors.push(`'${path}' is not registered`);
                      }
                    }
                  },
                });
              },
            },
          },
        }),
      ],
    });
    return errors;
  }

  it("class declarations", () => {
    expect(
      getScopeErrors(`
        class E {
          #m = () => E;
          static #s = 1;
          #f = 2;
          [k()] = 4;
          static y = E.#s;
        }
      `),
    ).toEqual([]);
  });

  it("class expressions", () => {
    expect(
      getScopeErrors(`
        var C = class {
          #m = () => C;
          static #s = 1;
          static x = this;
        };
      `),
    ).toEqual([]);
  });

  it("classes in loops", () => {
    expect(
      getScopeErrors(`
        for (const x of [1]) {
          class D {
            #m = () => D;
            static #s = 1;
            static y = this;
          }
        }
      `),
    ).toEqual([]);
  });

  it("anonymous default exported classes", () => {
    expect(
      getScopeErrors(`export default class { #q; static z = this; }`),
    ).toEqual([]);
  });

  it("memoised super classes", () => {
    expect(
      getScopeErrors(`class E extends (0, B) { static y = super.x; }`),
    ).toEqual([]);
  });
});
