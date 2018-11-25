expect(Number("1_000")).toBe(Number("1000"));
expect(Number("0xAE_BE_CE")).toBe(Number("0xAEBECE"));
expect(Number("0b1010_0001_1000_0101")).toBe(Number("0b1010000110000101"));
expect(Number("0o0_6_6_6")).toBe(Number("0o0666"));

expect(new Number("1_000").valueOf()).toBe(new Number("1000").valueOf());
expect(new Number("0xAE_BE_CE").valueOf()).toBe(new Number("0xAEBECE").valueOf());
expect(new Number("0b1010_0001_1000_0101").valueOf()).toBe(new Number("0b1010000110000101").valueOf());
expect(new Number("0o0_6_6_6").valueOf()).toBe(new Number("0o0666").valueOf());

expect(Number(1_000)).toBe(Number("1000"));
expect(Number(0xAE_BE_CE)).toBe(Number("0xAEBECE"));
expect(Number(0b1010_0001_1000_0101)).toBe(Number("0b1010000110000101"));
expect(Number(0o0_6_6_6)).toBe(Number("0o0666"));

expect(new Number(1_000).valueOf()).toBe(new Number("1000").valueOf());
expect(new Number(0xAE_BE_CE).valueOf()).toBe(new Number("0xAEBECE").valueOf());
expect(new Number(0b1010_0001_1000_0101).valueOf()).toBe(new Number("0b1010000110000101").valueOf());
expect(new Number(0o0_6_6_6).valueOf()).toBe(new Number("0o0666").valueOf());
