import _sort from "../lib/sort-plugins.js";
const sort = _sort.default || _sort;

describe("sort plugins", () => {
  const input = ["a", "b", "c", "d", "e"];

  function sortTest(orders) {
    const internalPlugins = input.map(name => ({
      origin: {
        name,
      },
    }));
    sort(internalPlugins, orders);
    return internalPlugins.map(item => item.origin.name);
  }

  it("case 1", () => {
    expect(
      sortTest({
        d: ["b"],
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "a",
        "d",
        "b",
        "c",
        "e",
      ]
    `);
  });

  it("case 2", () => {
    expect(
      sortTest({
        d: ["b"],
        e: ["d"],
      }),
    ).toMatchInlineSnapshot(`
      Array [
        "a",
        "e",
        "d",
        "b",
        "c",
      ]
    `);
  });
});
