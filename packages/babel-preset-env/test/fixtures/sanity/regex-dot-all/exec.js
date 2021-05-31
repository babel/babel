const input = `
Lorem ipsum dolor sit amet, consectetur adipiscing hello
world elit. Nam sit amet elit id risus aliquam porta.
`;

expect(/hello.world/.test(input)).toBe(false);
expect(/hello.world/u.test(input)).toBe(false);
expect(/hello.world/s.test(input)).toBe(true);
expect(/hello.world/su.test(input)).toBe(true);
