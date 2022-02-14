let [x = 23] = [,];
expect(x).toEqual(23);

const [y = 24, z] = [, 42];
expect(y).toEqual(24);
expect(z).toEqual(42);

function* foo() {
    yield 1;
    yield 2;
}

let bar = foo();

const [a = bar.next().value, b] = [, bar.next().value];

expect(a).toEqual(2);
expect(b).toEqual(1);

const arr = [c = 42] = [,];
expect(c).toEqual(42);
expect(arr).toEqual([,]);

var iterCount = 0;

for (const [x = 23] = [,]; iterCount < 1; ) {
    expect(x).toEqual(23);
    // another statement

    iterCount += 1;
}

expect(iterCount).toEqual(1);

const [...d] = [,];
const [...{ 0: e }] = [,];

expect(d).toEqual([,]);
expect(e).toEqual(undefined);

const [f] = [,];
expect(f).toEqual(undefined);

let [g] = [,];
expect(g).toEqual(undefined);

let thrown;
try {
  thrown = false;
  [{}] = [,];
} catch (e) {
  thrown = true;
}
expect(thrown).toEqual(true);

try {
  thrown = false;
  [[]] = [,];
} catch (e) {
  thrown = true;
}
expect(thrown).toEqual(true);
