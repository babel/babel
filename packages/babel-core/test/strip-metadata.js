import * as babel from "../lib/index";

describe("strip-metadata", function() {
  it("removes prefixed directives", function() {
    const result = babel.transform("", {
      plugins: [
        function({ prefix, types: t }) {
          return {
            visitor: {
              Program(path) {
                path.pushContainer("directives", [
                  t.directive(t.directiveLiteral(`some directive1`)),
                  t.directive(t.directiveLiteral(`${prefix}some directive2`)),
                  t.directive(t.directiveLiteral(`some directive3`)),
                  t.directive(t.directiveLiteral(`${prefix}some directive4`)),
                  t.directive(t.directiveLiteral(`some directive5`)),
                ]);
              },
            },
          };
        },
      ],
    });

    expect(result.code).toEqual(
      [`"some directive1";`, `"some directive3";`, `"some directive5";`].join(
        "\n",
      ),
    );
  });

  it("removes prefixed labeled statements", function() {
    const result = babel.transform("", {
      plugins: [
        function({ prefix, types: t }) {
          return {
            visitor: {
              Program(path) {
                path.pushContainer("body", [
                  t.labeledStatement(t.identifier(`l1`), t.blockStatement([])),
                  t.labeledStatement(
                    t.identifier(`${prefix}l2`),
                    t.blockStatement([]),
                  ),
                  t.labeledStatement(t.identifier(`l3`), t.blockStatement([])),
                  t.labeledStatement(
                    t.identifier(`${prefix}l4`),
                    t.blockStatement([]),
                  ),
                  t.labeledStatement(t.identifier(`l5`), t.blockStatement([])),
                  t.ifStatement(
                    t.booleanLiteral(true),
                    t.labeledStatement(
                      t.identifier(`${prefix}l6`),
                      t.blockStatement([]),
                    ),
                  ),
                  t.ifStatement(
                    t.booleanLiteral(true),
                    t.labeledStatement(
                      t.identifier(`l7`),
                      t.blockStatement([]),
                    ),
                  ),
                ]);
              },
            },
          };
        },
      ],
    });

    expect(result.code).toEqual(
      [
        `l1: {}`,
        ``,
        `l3: {}`,
        ``,
        `l5: {}`,
        ``,
        `if (true) ;`,
        `if (true) l7: {}`,
      ].join("\n"),
    );
  });
});
