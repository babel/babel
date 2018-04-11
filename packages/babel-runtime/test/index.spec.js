"use strict";

describe("babel-runtime", () => {
  describe("instance methods entries", () => {
    it("bind, exists", () => {
      expect(
        require("../core-js/instance/bind")(() => {}).call(function () { return this; }, 42)(),
      ).toEqual(42);
    });

    it("bind, missing", () => {
      expect(
        require("../core-js/instance/bind")({}),
      ).toEqual(undefined);
    });

    it("codePointAt, exists", () => {
      expect(
        require("../core-js/instance/code-point-at")("").call("a", 0),
      ).toEqual(97);
    });

    it("codePointAt, missing", () => {
      expect(
        require("../core-js/instance/code-point-at")({}),
      ).toEqual(undefined);
    });

    it("concat, exists", () => {
      expect(
        require("../core-js/instance/concat")([]).call([1, 2], [3, 4]).length,
      ).toEqual(4);
    });

    it("concat, missing", () => {
      expect(
        require("../core-js/instance/concat")({}),
      ).toEqual(undefined);
    });

    it("copyWithin, exists", () => {
      expect(
        require("../core-js/instance/copy-within")([]).call([1, 2, 3], 1)[2],
      ).toEqual(2);
    });

    it("copyWithin, missing", () => {
      expect(
        require("../core-js/instance/copy-within")({}),
      ).toEqual(undefined);
    });

    it("endsWith, exists", () => {
      expect(
        require("../core-js/instance/ends-with")("").call("qwe", "we"),
      ).toEqual(true);
    });

    it("endsWith, missing", () => {
      expect(
        require("../core-js/instance/ends-with")({}),
      ).toEqual(undefined);
    });

    it("entries, exists", () => {
      expect(
        require("../core-js/instance/entries")([]).call([]).next().done,
      ).toEqual(true);
    });

    it("entries, missing", () => {
      expect(
        require("../core-js/instance/entries")({}),
      ).toEqual(undefined);
    });

    it("every, exists", () => {
      expect(
        require("../core-js/instance/every")([]).call([1, 2, 3], it => typeof it === "number"),
      ).toEqual(true);
    });

    it("every, missing", () => {
      expect(
        require("../core-js/instance/every")({}),
      ).toEqual(undefined);
    });

    it("fill, exists", () => {
      expect(
        require("../core-js/instance/fill")([]).call([1, 2, 3], 42)[1],
      ).toEqual(42);
    });

    it("fill, missing", () => {
      expect(
        require("../core-js/instance/fill")({}),
      ).toEqual(undefined);
    });

    it("filter, exists", () => {
      expect(
        require("../core-js/instance/filter")([]).call([1, 2, 3], it => it % 2).length,
      ).toEqual(2);
    });

    it("filter, missing", () => {
      expect(
        require("../core-js/instance/filter")({}),
      ).toEqual(undefined);
    });

    it("find, exists", () => {
      expect(
        require("../core-js/instance/find")([]).call([1, 2, 3], it => !(it % 2)),
      ).toEqual(2);
    });

    it("find, missing", () => {
      expect(
        require("../core-js/instance/find")({}),
      ).toEqual(undefined);
    });

    it("findIndex, exists", () => {
      expect(
        require("../core-js/instance/find-index")([]).call([1, 2, 3], it => !(it % 2)),
      ).toEqual(1);
    });

    it("findIndex, missing", () => {
      expect(
        require("../core-js/instance/find-index")({}),
      ).toEqual(undefined);
    });

    it("flags, exists", () => {
      expect(
        require("../core-js/instance/flags")(/./gim),
      ).toEqual("gim");
    });

    it("flags, missing", () => {
      expect(
        require("../core-js/instance/flags")({}),
      ).toEqual(undefined);
    });

    it("forEach, exists", () => {
      expect(
        typeof require("../core-js/instance/for-each")([]),
      ).toEqual("function");
    });

    it("forEach, missing", () => {
      expect(
        require("../core-js/instance/for-each")({}),
      ).toEqual(undefined);
    });

    it("includes, array", () => {
      expect(
        require("../core-js/instance/includes")([]).call([1, 2, 3], 2),
      ).toEqual(true);
    });

    it("includes, string", () => {
      expect(
        require("../core-js/instance/includes")("").call("qweasd", "ea"),
      ).toEqual(true);
    });

    it("includes, missing", () => {
      expect(
        require("../core-js/instance/includes")({}),
      ).toEqual(undefined);
    });

    it("indexOf, exists", () => {
      expect(
        require("../core-js/instance/index-of")([]).call([1, 2, 3], 4),
      ).toEqual(-1);
    });

    it("indexOf, missing", () => {
      expect(
        require("../core-js/instance/index-of")({}),
      ).toEqual(undefined);
    });

    it("keys, exists", () => {
      expect(
        require("../core-js/instance/keys")([]).call([]).next().done,
      ).toEqual(true);
    });

    it("keys, missing", () => {
      expect(
        require("../core-js/instance/keys")({}),
      ).toEqual(undefined);
    });

    it("lastIndexOf, exists", () => {
      expect(
        require("../core-js/instance/last-index-of")([]).call([1, 2, 3], 4),
      ).toEqual(-1);
    });

    it("lastIndexOf, missing", () => {
      expect(
        require("../core-js/instance/last-index-of")({}),
      ).toEqual(undefined);
    });

    it("map, exists", () => {
      expect(
        require("../core-js/instance/map")([]).call([1, 2, 3], it => it * it)[2],
      ).toEqual(9);
    });

    it("map, missing", () => {
      expect(
        require("../core-js/instance/map")({}),
      ).toEqual(undefined);
    });
    /*
    it("match, exists", () => {
      expect(
        require("../core-js/instance/match")("").call("qwe", /./)[0],
      ).toEqual("q");
    });

    it("match, missing", () => {
      expect(
        require("../core-js/instance/match")({}),
      ).toEqual(undefined);
    });
    */
    it("padEnd, exists", () => {
      expect(
        require("../core-js/instance/pad-end")("").call("qwe", 6),
      ).toEqual("qwe   ");
    });

    it("padEnd, missing", () => {
      expect(
        require("../core-js/instance/pad-end")({}),
      ).toEqual(undefined);
    });

    it("padStart, exists", () => {
      expect(
        require("../core-js/instance/pad-start")("").call("qwe", 6),
      ).toEqual("   qwe");
    });

    it("padStart, missing", () => {
      expect(
        require("../core-js/instance/pad-start")({}),
      ).toEqual(undefined);
    });

    it("reduce, exists", () => {
      expect(
        require("../core-js/instance/reduce")([]).call([1, 2, 3], (a, b) => a + b),
      ).toEqual(6);
    });

    it("reduce, missing", () => {
      expect(
        require("../core-js/instance/reduce")({}),
      ).toEqual(undefined);
    });

    it("reduceRight, exists", () => {
      expect(
        require("../core-js/instance/reduce-right")([]).call([1, 2, 3], (a, b) => a + b),
      ).toEqual(6);
    });

    it("reduceRight, missing", () => {
      expect(
        require("../core-js/instance/reduce-right")({}),
      ).toEqual(undefined);
    });

    it("repeat, exists", () => {
      expect(
        require("../core-js/instance/repeat")("").call("q", 6),
      ).toEqual("qqqqqq");
    });

    it("repeat, missing", () => {
      expect(
        require("../core-js/instance/repeat")({}),
      ).toEqual(undefined);
    });
    /*
    it("replace, exists", () => {
      expect(
        require("../core-js/instance/replace")("").call("qwe", /w/, "r"),
      ).toEqual("qre");
    });

    it("replace, missing", () => {
      expect(
        require("../core-js/instance/replace")({}),
      ).toEqual(undefined);
    });

    it("search, exists", () => {
      expect(
        require("../core-js/instance/search")("").call("qwe", /w/),
      ).toEqual(1);
    });

    it("search, missing", () => {
      expect(
        require("../core-js/instance/search")({}),
      ).toEqual(undefined);
    });
    */

    it("slice, exists", () => {
      expect(
        require("../core-js/instance/slice")([]).call([1, 2, 3], 1)[0],
      ).toEqual(2);
    });

    it("slice, missing", () => {
      expect(
        require("../core-js/instance/slice")({}),
      ).toEqual(undefined);
    });

    it("some, exists", () => {
      expect(
        require("../core-js/instance/some")([]).call([1, 2, 3], it => typeof it === "number"),
      ).toEqual(true);
    });

    it("some, missing", () => {
      expect(
        require("../core-js/instance/some")({}),
      ).toEqual(undefined);
    });

    it("sort, exists", () => {
      expect(
        typeof require("../core-js/instance/sort")([]),
      ).toEqual("function");
    });

    it("sort, missing", () => {
      expect(
        require("../core-js/instance/sort")({}),
      ).toEqual(undefined);
    });

    it("splice, exists", () => {
      expect(
        typeof require("../core-js/instance/splice")([]),
      ).toEqual("function");
    });

    it("splice, missing", () => {
      expect(
        require("../core-js/instance/splice")({}),
      ).toEqual(undefined);
    });
    /*
    it("split, exists", () => {
      expect(
        require("../core-js/instance/split")("").call("qwert", /e/)[1],
      ).toEqual("rt");
    });

    it("split, missing", () => {
      expect(
        require("../core-js/instance/split")({}),
      ).toEqual(undefined);
    });
    */
    it("startsWith, exists", () => {
      expect(
        require("../core-js/instance/starts-with")("").call("qwe", "qw"),
      ).toEqual(true);
    });

    it("startsWith, missing", () => {
      expect(
        require("../core-js/instance/starts-with")({}),
      ).toEqual(undefined);
    });

    it("trim, exists", () => {
      expect(
        require("../core-js/instance/trim")("").call(" qwe  "),
      ).toEqual("qwe");
    });

    it("trim, missing", () => {
      expect(
        require("../core-js/instance/trim")({}),
      ).toEqual(undefined);
    });

    it("values, exists", () => {
      expect(
        require("../core-js/instance/values")([]).call([]).next().done,
      ).toEqual(true);
    });

    it("values, missing", () => {
      expect(
        require("../core-js/instance/values")({}),
      ).toEqual(undefined);
    });
  });
});
