import { NodePath } from "../../lib";

describe("NodePath", () => {
  describe("setData/getData", () => {
    it("can set default value", function() {
      const path = new NodePath({}, {});

      expect(path.getData("foo", "test")).toBe("test");
    });
    it("can set false", function() {
      const path = new NodePath({}, {});
      path.setData("foo", false);

      expect(path.getData("foo", true)).toBe(false);
    });

    it("can set true", function() {
      const path = new NodePath({}, {});
      path.setData("foo", true);

      expect(path.getData("foo", false)).toBe(true);
    });

    it("can set null", function() {
      const path = new NodePath({}, {});
      path.setData("foo", null);

      expect(path.getData("foo", true)).toBe(null);
    });

    it("does not use object base properties", function() {
      const path = new NodePath({}, {});

      expect(path.getData("__proto__", "test")).toBe("test");
    });
  });
});
