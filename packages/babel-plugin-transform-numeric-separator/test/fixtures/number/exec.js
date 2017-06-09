assert.equal(Number("1_000"), Number("1000"));
assert.equal(Number("0xAE_BE_CE"), Number("0xAEBECE"));
assert.equal(Number("0b1010_0001_1000_0101"), Number("0b1010000110000101"));
assert.equal(Number("0o0_6_6_6"), Number("0o0666"));

assert.equal(new Number("1_000").valueOf(), new Number("1000").valueOf());
assert.equal(new Number("0xAE_BE_CE").valueOf(), new Number("0xAEBECE").valueOf());
assert.equal(new Number("0b1010_0001_1000_0101").valueOf(), new Number("0b1010000110000101").valueOf());
assert.equal(new Number("0o0_6_6_6").valueOf(), new Number("0o0666").valueOf());

assert.equal(Number(1_000), Number("1000"));
assert.equal(Number(0xAE_BE_CE), Number("0xAEBECE"));
assert.equal(Number(0b1010_0001_1000_0101), Number("0b1010000110000101"));
assert.equal(Number(0o0_6_6_6), Number("0o0666"));

assert.equal(new Number(1_000).valueOf(), new Number("1000").valueOf());
assert.equal(new Number(0xAE_BE_CE).valueOf(), new Number("0xAEBECE").valueOf());
assert.equal(new Number(0b1010_0001_1000_0101).valueOf(), new Number("0b1010000110000101").valueOf());
assert.equal(new Number(0o0_6_6_6).valueOf(), new Number("0o0666").valueOf());
