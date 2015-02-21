// labels

foo: for (let x of foo()) {
  while (true) {
    break foo;
  }
}

foo: for (let x of foo()) {
  while (true) {
    break;
  }
}

foo: for (let x of foo()) {
  break foo;
}

// basic

for (let x of foo()) {
  break;
}

for (let x of foo()) {
  while (true) {
    break;
  }
}
