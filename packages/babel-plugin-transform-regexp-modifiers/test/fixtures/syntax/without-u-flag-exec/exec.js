let regex = /(?ims:^[a-z].1$)/

expect(regex.test("Ax1")).toBeTruthy();
expect(regex.test("ax1")).toBeTruthy();
expect(regex.test("ax2")).toBeFalsy();
expect(regex.test("1ax1")).toBeFalsy();

expect(regex.test("a\r1")).toBeTruthy();
expect(regex.test("a\r\n1")).toBeFalsy();

expect(regex.test("\nax1\n\n\n\n\n\n\n\n\n")).toBeTruthy();
