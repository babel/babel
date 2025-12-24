function test(e) {
  let i = e;
  {
    const e = i[0];
    switch (e) {
      case "n":
        const e = 1;
        return true;
      default:
        return false
    }
  }
}

expect(test("nn")).toBe(true);
