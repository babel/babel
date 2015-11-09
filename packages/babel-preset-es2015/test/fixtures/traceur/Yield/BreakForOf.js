var g, x;

function* f() {
  try {
    yield 1;
    yield 2;
  } finally {
    x = 42;
  }
}

g = f();
x = 0;

for (let i of g) {
  break;
}

assert.equal(x, 42);

g = f();
x = 10;

(function () {
  for (let i of g) {
    return;
  }
}());

assert.equal(x, 42);

g = f();
x = 20;

label1:
for (let i of g) {
  if (i == 1) {
    continue label1;
  }
  assert.equal(x, 20);
}

g = f();
x = 30;

label2:
label3:
for (let i of g) {
  if (i == 1) {
    continue label2;
  }
  assert.equal(x, 30);
}

