try {
  foo();
} catch (a) {
  let b = 1;
}

let a = 1;

for (let a = 1; console.log(a) || a<10 ; a++) {
  let a = 2;
  console.log(a);
}

for (let a in { foo: "bar" }) {
  let a;
}

for (const a of ["foo", "bar"]) {
  let a;
}
