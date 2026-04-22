import { chmod } from "../lib/babel/util.js";

describe("util.js", () => {
  describe("chmod", () => {
    it("should warn the user if chmod fails", () => {
      const spyConsoleWarn = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      // The first argument should be a string.
      // The real reason chmod will fail is due to wrong permissions,
      // but this is enough to cause a failure.
      chmod(100, "file.js");

      expect(spyConsoleWarn).toHaveBeenCalledTimes(1);
      expect(spyConsoleWarn).toHaveBeenCalledWith(
        "Cannot change permissions of file.js",
      );

      spyConsoleWarn.mockRestore();
    });
  });
});
