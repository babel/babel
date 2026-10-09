let regex = /(?ims:^[a-z])/u;

expect(regex.test("\u017F")).toBeTruthy();
expect(/(?-ims:^[a-z].)(^[a-z].)/uims.test("a\nA0")).toBe(false);