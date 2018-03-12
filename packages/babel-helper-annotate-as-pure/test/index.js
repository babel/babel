import annotateAsPure from "../";
import assert from "assert";

describe("@babel/helper-annotate-as-pure", () => {
  it("will add leading comment", () => {
    const node = {};
    annotateAsPure(node);

    assert.deepEqual(node.leadingComments, [
      {
        type: "CommentBlock",
        value: "#__PURE__",
      },
    ]);
  });

  it("will not add an extra leading comment", () => {
    const node = {
      leadingComments: [
        {
          type: "CommentBlock",
          value: "#__PURE__",
        },
      ],
    };

    annotateAsPure(node);

    assert.deepEqual(node.leadingComments, [
      {
        type: "CommentBlock",
        value: "#__PURE__",
      },
    ]);
  });
});
