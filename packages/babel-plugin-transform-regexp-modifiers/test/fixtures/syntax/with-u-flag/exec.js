let regex = /(?ims:^[a-z])/u;

expect(regex.test("\u017F")).toBeTruthy();
